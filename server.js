import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import getSubDomain from './helpers/subDomain';
import PrettyError from 'pretty-error';
import http from 'http';
import reactCookie from 'react-cookie';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import multer from 'multer';
import bodyParser from 'body-parser';

const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: 'clinic',
  api_key: '676869843726733',
  api_secret: 'foThBMkX7npvcYuNsOi2DhJrqJ8'
});

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: config.apiUrl
});

app.use(cookieParser());

app.use((req, res, next) => {
  reactCookie.plugToRequest(req, res);
  next();
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.post('/upload', upload.single('thumbnail'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    res.send(result);
  });
});

app.use('/api/v1', (req, res) => {
  proxy.web(req, res, { target: config.apiUrl + '/api/v1' });
});

const onProxyReq = (proxyReq, req) => {
  if (req.cookies.sessionToken || req.query.sessionToken) {
    const sessionToken = req.cookies.sessionToken || req.query.sessionToken;
    const authorizationHeader = 'Bearer ' + sessionToken;
    proxyReq.setHeader('Authorization', authorizationHeader);
  }
};

app.post('/stripe/charge', bodyParser.json(), (req, res)=> {
  const stripe = require('stripe')('sk_test_AopgwkZFwvtosTZE1BSRFAo1');
  const stripeToken = req.body.stripeToken;
  const amount = req.body.amount;
  const currency = req.body.currency;
  stripe.charges.create({
    amount: amount,
    currency: currency,
    source: stripeToken,
    description: 'Example charge'
  }, (err, charge) => {
    if (err) {
      res.status(400).json(err.raw);
    } else {
      res.status(200).json(charge);
    }
  });
});

proxy.on('proxyReq', onProxyReq);

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  const subDomain = getSubDomain(req.header('host'));

  match({
    history,
    routes: getRoutes(store, subDomain),
    location: req.originalUrl
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: { client } }).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = { userAgent: req.headers['user-agent'] };

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component}
                                        store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiUrl);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
