import { BaseRepoSequelize } from '../../../core/BaseRepoSequelize';
import { User, UserEntity } from '../domain';

export interface IUserRepoSequelize extends BaseRepoSequelize<User> {
  findByEmail(email: string): Promise<User>;
}
export class UserRepoSequelize extends BaseRepoSequelize<User>
  implements IUserRepoSequelize {
  constructor(model, logger) {
    super(model, UserEntity, logger);
  }

  findByEmail = async (email: string): Promise<User> => {
    return await this.model.findOne({ where: { email } });
  };
}
