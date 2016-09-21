export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const BY_PORTAL_LIST = 'knexpert/course/BY_PORTAL_LIST';
export const BY_PORTAL_LIST_SUCCESS = 'knexpert/course/BY_PORTAL_LIST_SUCCESS';
export const BY_PORTAL_LIST_FAIL = 'knexpert/course/BY_PORTAL_LIST_FAIL';

import Immutable from 'immutable';
import {
  courses as coursesNormalize,
} from 'utils/normalize';

import { CREATE_SUCCESS } from './create';
import { EDIT_SUCCESS } from './edit';
import { RESET_COURSES } from './loaded';

const initialState = Immutable.fromJS({
  loaded: false,
  order: [],
  entities: {}
});

export default function byPortal(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case BY_PORTAL_LIST_SUCCESS:
      return state.withMutations(map=> {
        const {courses} = action.result.data;
        const {order} = coursesNormalize(courses);
        order.map(course=> {
          map.setIn(['entities', course], true);
        });
        map.set('order', Immutable.fromJS(order));
        map.set('loaded', true);
      });
    case CREATE_SUCCESS:
    case EDIT_SUCCESS:
      return state.withMutations(map=> {
        const { course } = action.result.data;
        map.update('order', array=>array.push(course.slug));
      });
    case RESET_COURSES:
      return state.set('loaded', false);
    default:
      return state;
  }
}

export function load(portalName) {
  return {
    types: [BY_PORTAL_LIST, BY_PORTAL_LIST_SUCCESS, BY_PORTAL_LIST_FAIL],
    promise: (client) => client.get(`api/v1/course/portal/${portalName}`)
  };
}

export function isLoaded(globalState) {
  return globalState.coursesByPortal && globalState.coursesByPortal.get('loaded');
}
