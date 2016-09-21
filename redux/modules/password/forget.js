export const FORGET = 'knexpert/password/FORGET';
export const FORGET_SUCCESS = 'knexpert/password/FORGET_SUCCESS';
export const FORGET_FAIL = 'knexpert/password/FORGET_FAIL';

import {SubmissionError} from 'redux-form';

function _create(email) {
  return {
    types: [FORGET, FORGET_SUCCESS, FORGET_FAIL],
    promise: (client) => client.post(`/api/v1/password/reset/${email}`, { data: {} }),
    data: {
      email
    }
  };
}

export function sendResetToken(email) {
  return dispatch => {
    return dispatch(
      _create(email))
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
