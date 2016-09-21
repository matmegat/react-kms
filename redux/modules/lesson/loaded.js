export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const LOAD = 'knexpert/lessons/LOAD';
export const LOAD_SUCCESS = 'knexpert/lessons/LOAD_SUCCESS';
export const LOAD_FAIL = 'knexpert/lessons/LOAD_FAIL';

export function isLoaded(globalState, courseName) {
  return globalState.courseLoaded && globalState.courseLoaded.getIn(['entities', courseName, 'lessons', 'listLoaded']);
}

export function load(courseName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/v1/lesson/${courseName}`),
    data: {
      courseName
    }
  };
}
