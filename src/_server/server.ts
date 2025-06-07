import http from 'http';
import app from './app';
import { constants } from '@util/constants/_constants';

const server = http.createServer(app);

server.listen(constants.APP_PORT, () => {
  console.info(`[🚀] Server Started on ${constants.APP_HOST}:${constants.APP_PORT}`);
});
