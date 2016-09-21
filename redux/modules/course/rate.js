export const RATE = 'knexpert/course/RATE';
export const RATE_SUCCESS = 'knexpert/course/RATE_SUCCESS';
export const RATE_FAIL = 'knexpert/course/RATE_FAIL';

function _rate(model) {
  return {
    types: [RATE, RATE_SUCCESS, RATE_FAIL],
    promise: (client) => client.post(`/api/v1/course/rate`, { data: model }),
    data: {
      model
    }
  };
}

export function rate(model) {
  return dispatch => {
    return dispatch(
      _rate(model))
      .then(()=> {
        alert('saved');
      })
      .catch(res => {
        alert(JSON.stringify(res));
      });
  };
}
