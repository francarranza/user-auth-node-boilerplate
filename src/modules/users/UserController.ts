import { BaseController } from '../../core/BaseController';
import { UserFieldError } from '../../core/BaseErrors';
import { IUseCase } from '../../core/BaseUseCase';
import {
  httpRequest,
  httpResponse,
} from '../../infrastructure/express/RequestResponseAdapter';
import { ILogger } from '../../infrastructure/logger';

export interface IUserController {
  postLogin(req: httpRequest): Promise<httpResponse>;
  postSignup(req: httpRequest): Promise<httpResponse>;
}

export class UsersController extends BaseController {
  private logger: ILogger;
  private loginUserUseCase: IUseCase;
  private createUserUseCase: IUseCase;

  constructor(
    logger: ILogger,
    loginUserUseCase: IUseCase,
    createUserUseCase: IUseCase,
  ) {
    super();
    this.logger = logger;
    this.loginUserUseCase = loginUserUseCase;
    this.createUserUseCase = createUserUseCase;
  }

  postLogin = async (req: httpRequest): Promise<httpResponse> => {
    try {
      const { email, password } = req.body;
      const res = await this.loginUserUseCase.execute({ email, password });
      this.logger.info('postLoginController');
      return this.ok(res);
    } catch (err) {
      if (err instanceof UserFieldError) return this.clientError(err.message);
      else {
        this.logger.error(err);
        return this.fail();
      }
    }
  };

  postSignup = async (req: httpRequest): Promise<httpResponse> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new UserFieldError('Must provide email and password');

      const res = await this.createUserUseCase.execute({ email, password });
      return this.created({ uuid: res.uuid, email: res.email });
    } catch (err) {
      if (err instanceof UserFieldError) return this.clientError(err.message);
      else {
        this.logger.error(err);
        return this.fail();
      }
    }
  };
}
