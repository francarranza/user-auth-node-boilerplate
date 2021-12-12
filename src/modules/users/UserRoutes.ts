import { Router } from 'express';
import { makeReqResAdapter } from '../../infrastructure/express/RequestResponseAdapter';
import { IUserController } from './UserController';

export const loadUserRoutes = (
  router: Router,
  userController: IUserController,
) => {
  router.post('/v1/auth/login', makeReqResAdapter(userController.postLogin));
  router.post('/v1/auth/signup', makeReqResAdapter(userController.postSignup));
};
