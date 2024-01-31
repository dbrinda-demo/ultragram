import express from 'express';
import next from 'next';
import config from '@nomad/config';

const app = express();
app.disable('x-powered-by');

const nextApp = next({ dir: 'app', dev: true });
const handle = nextApp.getRequestHandler();

nextApp.prepare()
  .then(() => {
    console.log('next app started');

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    app.listen(config.ports.ui)
    .once('listening', () => {
      console.log(`ui listening on port ${config.ports.ui}`);
    })
    .once('error', e => {
      console.log(`unknown error occurred`);
      console.log(e);
    });
  })
  .catch(e => {
    console.log(e);
  });
