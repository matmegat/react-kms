export const INIT = '@@INIT';
export const REDUX_INIT = '@@redux/INIT';
export const REMOVE = 'knexpert/lessons/REMOVE';
export const REMOVE_SUCCESS = 'knexpert/lessons/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'knexpert/lessons/REMOVE_FAIL';

export function remove(courseName, lessonName) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.del(`/api/v1/lesson/name/${lessonName}`),
    data: {
      lessonName,
      courseName,
    }
  };
}
