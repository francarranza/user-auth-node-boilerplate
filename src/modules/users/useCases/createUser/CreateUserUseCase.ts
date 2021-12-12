import { EntityFieldError, UserFieldError } from '../../../../core/BaseErrors';
import { UseCase } from '../../../../core/BaseUseCase';
import { ILogger } from '../../../../infrastructure/logger';
import { PasswordHelpers } from '../../../../infrastructure/security/password';
import { User, UserEntity } from '../../domain';
import { IUserRepoSequelize } from '../../repos/UserRepoSequelize';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase extends UseCase {
  private userRepo: IUserRepoSequelize;
  private logger: ILogger;
  private passwordHelpers: PasswordHelpers;

  constructor(
    logger: ILogger,
    userRepo: IUserRepoSequelize,
    passwordHelpers: PasswordHelpers,
  ) {
    super();
    this.userRepo = userRepo;
    this.logger = logger;
    this.passwordHelpers = passwordHelpers;
  }

  async execute(body: CreateUserDTO): Promise<User> {
    try {

      const { email, password } = body;
      const user = await this.userRepo.findByEmail(email);
      if (user) {
        this.logger.info(`CreateUserUseCase: User already exists`);
        throw new UserFieldError('User already exists');
      }

      const newUser = new UserEntity({ email, password });
      const created = await this.userRepo.create(newUser);
      this.logger.info(`CreateUserUseCase: User created with id: ${created.id}`);
      return created;

    } catch (err) {

      if (err instanceof EntityFieldError) {
        this.logger.info(`CreateUserUseCase: User entity field error: ${err.message}`);
      } else {
        this.logger.error(`CreateUserUseCase`, err);
      }
      throw err;
    }

  }
}
