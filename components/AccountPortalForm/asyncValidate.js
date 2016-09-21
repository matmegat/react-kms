import superagent from 'superagent';
import * as async from 'async';

const checkAvailability = (values) => {
  return new Promise((resolve, reject) => {
    async.parallel(
      {
        username: (cb)=> values.username ? superagent.get(`/api/v1/author/${values.username}/available`).end((err, {body} = {})=> {
          if (err) cb(err);
          const { available } = body.data;
          if (!available) cb({ username: 'This username already token' });
          else cb(null);
        }) : cb(null),
        portalName: (cb)=> values.portalName ? superagent.get(`/api/v1/portal/${values.portalName}/available`).end((err, {body} = {})=> {
          if (err) cb(err);
          const { available } = body.data;
          if (!available) cb({ portalName: 'This portal name already token' });
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
