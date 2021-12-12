import express, { Router } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { IConfig } from '../config';
import { loadUserRoutes } from '../../modules/users/UserRoutes';
import { userController } from '../../modules/users';

export const configExpress = async (
  app: express.Application,
  config: IConfig,
) => {
  app.use(cors());
  app.use(express.json());
  app.use(compression());
  app.use(helmet());
  app.use(morgan('tiny'));

  const router = Router();
  loadUserRoutes(router, userController);
  app.use(config.http.prefix, router);

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ error: 'Please check JSON' });
    }
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/status', (req, res) => {
    return res.send('Success');
  });
};
