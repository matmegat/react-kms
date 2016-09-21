export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LIST = 'knexpert/categories/LIST';
export const LIST_SUCCESS = 'knexpert/categories/LIST_SUCCESS';
export const LIST_FAIL = 'knexpert/categories/LIST_FAIL';

import Immutable from 'immutable';
import {
  categories as categoriesNormalize,
} from 'utils/normalize';

import { RESET_COURSES } from '../course/loaded';

const initialState = Immutable.fromJS({
  order: [],
  entities: {}
});

export default function categoriesLoaded(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LIST_SUCCESS:
      return state.withMutations(map=> {
        const categories = categoriesNormalize(action.result.data);
        map.merge(Immutable.fromJS(categories));
      });
    case RESET_COURSES:
      return initialState;
    default:
      return state;
  }
}

export function load(portalName) {
  return {
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get(`/api/v1/portal/${portalName}/categories`),
    data: {
      portalName
    }
  };
}

export function isLoaded(globalState) {
  return globalState.categoriesLoaded && globalState.categoriesLoaded.get('listLoaded');
}
