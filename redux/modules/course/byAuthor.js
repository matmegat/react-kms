export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const BY_AUTHOR_LIST = 'knexpert/course/By_AUTHOR_LIST';
export const BY_AUTHOR_LIST_SUCCESS = 'knexpert/course/By_AUTHOR_LIST _SUCCESS';
export const BY_AUTHOR_LIST_FAIL = 'knexpert/course/By_AUTHOR_LIST _FAIL';

import Immutable from 'immutable';
import {
  courses as coursesNormalize,
} from 'utils/normalize';
import { RESET_COURSES } from './loaded';

const initialState = Immutable.fromJS({
  loaded: false,
  order: [],
  entities: {}
});

export default function byAuthor(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case BY_AUTHOR_LIST_SUCCESS:
      return state.withMutations(map=> {
        const {courses} = action.result.data.courses;
        const {order} = coursesNormalize(courses);
        order.map(course=> {
          map.setIn(['entities', course], true);
        });
        map.set('order', Immutable.fromJS(order));
        map.set('loaded', true);
      });
    case RESET_COURSES:
      return state.set('loaded', false);
    default:
      return state;
  }
}

export function load(authorName) {
  return {
    types: [BY_AUTHOR_LIST, BY_AUTHOR_LIST_SUCCESS, BY_AUTHOR_LIST_FAIL],
    promise: (client) => client.get(`api/v1/course/author/${authorName}`)
  };
}

export function isLoaded(globalState) {
  return globalState.coursesByAuthor && globalState.coursesByAuthor.get('loaded');
}
