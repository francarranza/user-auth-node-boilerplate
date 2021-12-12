import { logger } from '../../infrastructure/logger';
import { createUserUseCase } from './useCases/createUser';
import { loginUserUseCase } from './useCases/loginUser';
import { UsersController } from './UserController';

const userController = new UsersController(
  logger,
  loginUserUseCase,
  createUserUseCase,
);

export { userController };
