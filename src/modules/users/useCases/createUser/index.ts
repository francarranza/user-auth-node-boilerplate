import { logger } from '../../../../infrastructure/logger';
import { PasswordHelpers } from '../../../../infrastructure/security/password';
import { userRepoSeq } from '../../repos';
import { CreateUserUseCase } from './CreateUserUseCase';

const passwordHelpers = new PasswordHelpers();
const createUserUseCase = new CreateUserUseCase(
  logger,
  userRepoSeq,
  passwordHelpers,
);

export { createUserUseCase };
