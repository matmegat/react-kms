export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';

export const VERIFY_EMAIL = 'knexpert/auth/VERIFY_EMAIL';
export const VERIFY_EMAIL_SUCCESS = 'knexpert/auth/VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAIL = 'knexpert/auth/VERIFY_EMAIL_FAIL';

export const SEND_VERIFY_EMAIL = 'knexpert/auth/SEND_VERIFY_EMAIL';
export const SEND_VERIFY_EMAIL_SUCCESS = 'knexpert/auth/SEND_VERIFY_EMAIL_SUCCESS';
export const SEND_VERIFY_EMAIL_FAIL = 'knexpert/auth/SEND_VERIFY_EMAIL_FAIL';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loading: false,
  loaded: false,
  verified: false,
  sentAgain: false,
});

export default function userVerify(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case VERIFY_EMAIL:
      return state.set('loading', true);
    case VERIFY_EMAIL_SUCCESS:
      return state.withMutations(map=> {
        map.set('loading', false);
        map.set('loaded', true);
        map.set('verified', true);
      });
    case VERIFY_EMAIL_FAIL:
      return state.withMutations(map=> {
        map.set('loading', false);
        map.set('loaded', true);
        map.set('verified', false);
      });
    case SEND_VERIFY_EMAIL:
      return state.set('sentAgain', true);
    case SEND_VERIFY_EMAIL_SUCCESS:
    case SEND_VERIFY_EMAIL_FAIL:
      alert(JSON.stringify(action.error.error));
      return state;
    default:
      return state;
  }
}

export function verifyEmail(token) {
  return {
    types: [VERIFY_EMAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAIL],
    promise: (client) => client.get(`/api/v1/verify/email/${token}`),
    data: {
      token
    }
  };
}

export function resend(email) {
  return {
    types: [SEND_VERIFY_EMAIL, SEND_VERIFY_EMAIL_SUCCESS, SEND_VERIFY_EMAIL_FAIL],
    promise: (client) => client.post(`/api/v1/verify/email/${email}`),
  };
}
