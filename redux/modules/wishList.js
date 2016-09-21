export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const ADD_TO_WISH_LIST = 'knexpert/wishlist/ADD_TO_WISH_LIST';
export const ADD_TO_WISH_LIST_SUCCESS = 'knexpert/wishlist/ADD_TO_WISH_LIST_SUCCESS';
export const ADD_TO_WISH_LIST_FAIL = 'knexpert/wishlist/ADD_TO_WISH_LIST_FAIL';
export const REMOVE_FROM_WISH_LIST = 'knexpert/wishlist/REMOVE_FROM_WISH_LIST';
export const REMOVE_FROM_WISH_LIST_SUCCESS = 'knexpert/wishlist/REMOVE_FROM_WISH_LIST_SUCCESS';
export const REMOVE_FROM_WISH_LIST_FAIL = 'knexpert/wishlist/REMOVE_FROM_WISH_LIST_FAIL';
export const LOAD_MY_WISH_LIST = 'knexpert/wishlist/LOAD_MY_WISH_LIST';
export const LOAD_MY_WISH_LIST_SUCCESS = 'knexpert/wishlist/LOAD_MY_WISH_LIST_SUCCESS';
export const LOAD_MY_WISH_LIST_FAIL = 'knexpert/wishlist/LOAD_MY_WISH_LIST_FAIL';

import Immutable from 'immutable';

import { LOGOUT_SUCCESS } from './auth';

const initialState = Immutable.fromJS({
  isLoaded: false,
  order: [],
  entities: {}
});

export default function wishList(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case ADD_TO_WISH_LIST:
      return state.withMutations(map=> {
        const {courseName} = action.data;
        map.update('order', array=>array.push(courseName));
        map.setIn(['entities', courseName], true);
      });
    case REMOVE_FROM_WISH_LIST:
      return state.withMutations(map=> {
        const {courseName} = action.data;
        map.removeIn(['entities', courseName]);
        map.update('order', array=>array.filter((item)=> item !== courseName));
      });
    case LOAD_MY_WISH_LIST_SUCCESS:
      return state.withMutations(map=> {
        const { wishlistItems } = action.result.data;
        wishlistItems.map((item)=> {
          map.setIn(['entities', item.course.slug], true);
          map.update('order', array=>array.push(item.course.slug));
        });
        map.set('isLoaded', true);
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export function removeFromWishList(course) {
  return {
    types: [REMOVE_FROM_WISH_LIST, REMOVE_FROM_WISH_LIST_SUCCESS, REMOVE_FROM_WISH_LIST_FAIL],
    promise: (client) => client.del(`/api/v1/wishlist/${course.get('slug')}`),
    data: {
      courseName: course.get('slug')
    }
  };
}

export function addToWishList(course) {
  return {
    types: [ADD_TO_WISH_LIST, ADD_TO_WISH_LIST_SUCCESS, ADD_TO_WISH_LIST_FAIL],
    promise: (client) => client.post(`/api/v1/wishlist`, { data: { courseId: course.get('id') } }),
    data: {
      courseName: course.get('slug')
    }
  };
}

export function load() {
  return {
    types: [LOAD_MY_WISH_LIST, LOAD_MY_WISH_LIST_SUCCESS, LOAD_MY_WISH_LIST_FAIL],
    promise: (client) => client.get(`/api/v1/wishlist?includeCourse=true`),
  };
}

export function isLoaded(globalState) {
  return globalState.wishList && globalState.wishList.get('isLoaded');
}
