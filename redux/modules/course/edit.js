export const EDIT = 'knexpert/course/EDIT';
export const EDIT_SUCCESS = 'knexpert/course/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/course/EDIT_FAIL';

import {SubmissionError} from 'redux-form';
import {resetCourses} from './loaded';

function _edit(model, courseName, portalId) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/course/name/${courseName}`, { data: { ...model, portalId } }),
    data: {
      model
    }
  };
}

export function edit(model, courseName, portalId) {
  return dispatch => {
    return dispatch(_edit(model, courseName, portalId))
      .then(() => {
        dispatch(resetCourses());
      })
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
