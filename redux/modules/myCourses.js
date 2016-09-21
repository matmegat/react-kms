export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/mycourses/LOAD';
export const LOAD_SUCCESS = 'knexpert/mycourses/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/mycourses/LOAD_FAIL';
export const ADD = 'knexpert/mycourses/ADD';
export const ADD_SUCCESS = 'knexpert/mycourses/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/mycourses/ADD_FAIL';
export const STRIPE_CHARGE = 'knexpert/mycourses/STRIPE_CHARGE';
export const STRIPE_CHARGE_SUCCESS = 'knexpert/mycourses/STRIPE_CHARGE_SUCCESS';
export const STRIPE_CHARGE_FAIL = 'knexpert/mycourses/STRIPE_CHARGE_FAIL';


import Immutable from 'immutable';

import { LOGOUT_SUCCESS } from './auth';

const initialState = Immutable.fromJS({
  isLoaded: false,
  order: [],
  entities: {}
});

export default function myCourses(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return Immutable.fromJS(state);
    case LOAD_SUCCESS:
      return state.withMutations(map=> {
        const {wishlistItems} = action.result.data;
        wishlistItems.map((item)=> {
          map.setIn(['entities', item.course.slug], true);
          map.update('order', array=>array.push(item.course.slug));
        });
        map.set('isLoaded', true);
      });
    case LOGOUT_SUCCESS:
      return initialState;
    case ADD:
      return state.withMutations(map=> {
        const {courseName} = action.data;
        map.setIn(['entities', courseName], true);
        map.update('order', array=>array.push(courseName));
      });
    case ADD_FAIL:
      alert(JSON.stringify(action.result, null, 4));
      return state;
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/mycourses?includeCourse=true`),
  };
}


export function isLoaded(globalState) {
  return globalState.myCourses && globalState.myCourses.get('isLoaded');
}

function stripeCharge(course, stripeToken) {
  return {
    types: [STRIPE_CHARGE, STRIPE_CHARGE_SUCCESS, STRIPE_CHARGE_FAIL],
    promise: (client) => client.post(`/stripe/charge`, {
      data: {
        stripeToken,
        amount: course.getIn(['coursePrice', 'price']) * 100,
        currency: 'usd'
      }
    })
  };
}
function _add(course, transactionId) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(`/api/v1/mycourses`, {
      data: {
        transactionId,
        courseId: course.get('id')
      }
    }),
    data: {
      courseName: course.get('slug')
    }
  };
}
export function add(course, tokenId) {
  return dispatch => {
    dispatch(stripeCharge(course, tokenId))
      .then(res=>dispatch(_add(course, res.id)))
      .catch(err=> {
        alert(JSON.stringify(err, null, 4));
      });
  };
}
