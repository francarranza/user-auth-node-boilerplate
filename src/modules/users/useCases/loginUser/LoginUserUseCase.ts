import { UserFieldError } from '../../../../core/BaseErrors';
import { UseCase } from '../../../../core/BaseUseCase';
import { ILogger } from '../../../../infrastructure/logger';
import { JwtHelpers } from '../../../../infrastructure/security/jwt';
import { PasswordHelpers } from '../../../../infrastructure/security/password';
import { JwtUserPayload } from './JwtUserPayload';
import { LoginUserResponse } from './LoginUserResponse';

export class LoginUserUseCase extends UseCase {
  private userRepo;
  private logger: ILogger;
  private passwordHelpers: PasswordHelpers;
  private jwtHelpers: JwtHelpers;

  constructor(
    logger: ILogger,
    userRepo,
    passwordHelpers: PasswordHelpers,
    jwtHelpers: JwtHelpers,
  ) {
    super();
    this.userRepo = userRepo;
    this.logger = logger;
    this.passwordHelpers = passwordHelpers;
    this.jwtHelpers = jwtHelpers;
  }

  async execute(body: {
    email: string;
    password: string;
  }): Promise<LoginUserResponse> {
    const { email, password } = body;

    if (!email) {
      throw new UserFieldError('Email not provided');
    }

    if (!password) {
      throw new UserFieldError('Password not provided');
    }

    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      this.logger.info(`LoginUserUseCase: email ${email} not found`);
      throw new UserFieldError('User not found');
    }

    const isValid = await this.passwordHelpers.isValid(
      password,
      user.hashedPassword,
    );
    if (!isValid) {
      this.logger.info(
        `LoginUserUseCase: Invalid password for user id ${user.id}`,
      );
      throw new UserFieldError('Invalid credentials');
    }

    const payload: JwtUserPayload = { uuid: user.uuid, email: user.email };
    const jwt = await this.jwtHelpers.generateJWT(payload);
    const response: LoginUserResponse = { user: payload, jwt };
    return response;
  }
}
