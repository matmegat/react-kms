export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const SET_REQ_SUBDOMAIN = 'knexpert/portal/SET_REQ_SUBDOMAIN';
export const LOAD = 'knexpert/portal/LOAD';
export const LOAD_SUCCESS = 'knexpert/portal/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/portal/LOAD_FAIL';

import Immutable from 'immutable';
import { UPDATE_COVER_IMAGE_SUCCESS } from './edit';

const initialState = Immutable.fromJS({
  loaded: false,
  reqSubdomain: '',
  meta: {}
});

export default function portal(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case SET_REQ_SUBDOMAIN:
      return state.set('reqSubdomain', action.subdomain);
    case UPDATE_COVER_IMAGE_SUCCESS:
      return state.setIn(['meta', 'coverImage'], action.data.coverImage);
    case LOAD_SUCCESS:
      return state.withMutations(map=> {
        if (action.result && !action.result.coverImage) {
          action.result.coverImage = 'https://udemy-images.udemy.com/course/750x422/129118_fab9_7.jpg';
        }
        const meta = Immutable.fromJS(action.result);
        map.set('meta', meta);
        map.set('loaded', true);
      });
    case LOAD:
    case LOAD_FAIL:
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.portalCurrent && globalState.portalCurrent.get('loaded') && globalState.portalCurrent.get('reqSubdomain');
}

export function load(portalName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/portal/${portalName}`)
  };
}
