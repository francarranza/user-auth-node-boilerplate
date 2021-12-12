import { config } from '../../../../infrastructure/config';
import { logger } from '../../../../infrastructure/logger';
import UserModel from '../../../../infrastructure/orm/sequelize/models/User';
import { JwtHelpers } from '../../../../infrastructure/security/jwt';
import { PasswordHelpers } from '../../../../infrastructure/security/password';
import { UserRepoSequelize } from '../../repos/UserRepoSequelize';
import { LoginUserUseCase } from './LoginUserUseCase';

const userRepoSeq = new UserRepoSequelize(UserModel, logger);
const passwordHelpers = new PasswordHelpers();
const jwtHelpers = new JwtHelpers(config, logger);

const loginUserUseCase = new LoginUserUseCase(
  logger,
  userRepoSeq,
  passwordHelpers,
  jwtHelpers,
);

export { loginUserUseCase };
