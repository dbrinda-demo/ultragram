'use strict';

import config from '@nomad/config';
import express from 'express';
import router from './api/routes/index.js';
import { noCache } from './middlewares/cache-control.js';
import errorHandler from './middlewares/error-handler.js';
import requestLogger from './middlewares/logger.js';
import cors from 'cors';

const app = express();

//default no-cache cache-control and no eTag unless explicitly set
//TODO: set proper cache headers
app.disable('etag');
app.use(requestLogger());
app.use(cors());
app.use(noCache());
app.disable('x-powered-by');

app.use(router);
app.use(errorHandler());

new Promise((resolve, reject) => {
  app.listen(config.ports.server)
  .once('listening', resolve)
  .once('error', reject);
})
.then(() => {
  console.log(`api server listening at http://localhost:${config.ports.server}`);
})
.catch(e => {
  console.log('An error has occurred starting express');
  console.log(e);
});
