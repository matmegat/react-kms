export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/lessonEdit/LOAD';
export const LOAD_SUCCESS = 'knexpert/lessonEdit/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/lessonEdit/LOAD_FAIL';
export const EDIT = 'knexpert/lessons/EDIT';
export const EDIT_SUCCESS = 'knexpert/lessons/EDIT_SUCCESS';
export const EDIT_FAIL = 'knexpert/lessons/EDIT_FAIL';

import {SubmissionError} from 'redux-form';
import { push } from 'react-router-redux';

export function load(courseName, lessonName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/lesson/${courseName}/${lessonName}`),
    data: {
      courseName,
      lessonName,
    }
  };
}

export function isLoaded(globalState, courseName, lessonName) {
  return globalState.courseLoaded && globalState.courseLoaded.getIn(['entities', courseName, 'lessons', 'entities', lessonName]);
}

function edit(model, lessonName, courseName) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    promise: (client) => client.put(`/api/v1/lesson/${courseName}/${lessonName}`, { data: model }),
    data: {
      model,
      courseName,
      lessonName,
    }
  };
}

export function editLesson(model, courseId, courseName, lessonName) {
  return dispatch => {
    return dispatch(edit({ ...model, order: 1, courseId }, lessonName, courseName))
      .then(()=> setTimeout(()=> dispatch(push(`/author/course/${courseName}/lesson/list`)), 2500))
      .catch(res => {
        throw new SubmissionError({ _error: res.error });
      });
  };
}
