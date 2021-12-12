import express from 'express';
import { config } from '../config';
import { logger } from '../logger';
import { configExpress } from './configExpress';

export const startServer = async (): Promise<void> => {
  const app = express();
  configExpress(app, config);

  app.listen(config.http.port, async () => {
    logger.info('🚀 Server is running in port: ' + config.http.port);
  });
};
