export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const ADD = 'knexpert/lessons/ADD';
export const ADD_SUCCESS = 'knexpert/lessons/ADD_SUCCESS';
export const ADD_FAIL = 'knexpert/lessons/ADD_FAIL';

import {SubmissionError} from 'redux-form';
import { push } from 'react-router-redux';


export function _add(model, courseName) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(`/api/v1/lesson`, { data: model }),
    data: {
      model,
      courseName
    }
  };
}

export function add(model, courseId, courseName) {
  return dispatch => {
    return dispatch(_add({ ...model, order: 1, courseId }, courseName))
      .then(()=> {
        setTimeout(()=> dispatch(push('/author/course/' + courseName + '/lesson/list')), 2500);
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
