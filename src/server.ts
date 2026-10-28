import http from 'node:http';
import app from './app';
import { appConfig } from './config/app-config';
import { logger } from './core/logger';

const server = http.createServer(app);

server.listen(appConfig.port, () => {
  logger.info(`[server-init] Server Started on ${appConfig.host}:${appConfig.port}`);
});
