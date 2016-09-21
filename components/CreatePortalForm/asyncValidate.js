import superagent from 'superagent';
import * as async from 'async';

const checkAvailability = (values) => {
  return new Promise((resolve, reject) => {
    async.parallel(
      {
        name: (cb)=> values.name ? superagent.get(`/api/v1/portal/${values.name}/available`).end((err, {body} = {})=> {
          if (err) cb(err);
          const { available } = body.data;
          if (!available) cb({ name: 'This portal name already token' });
          else cb(null);
        }) : cb(null)
      },
      (err, { body } = {})=> err ? reject(err || body) : resolve(err)
    );
  });
};

const asyncValidate = (values) => {
  return checkAvailability(values)
    .catch((err)=> {
      throw err; // eslint-disable-line no-throw-literal
    });
};

export default asyncValidate;
