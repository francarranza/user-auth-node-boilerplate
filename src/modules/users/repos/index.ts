import { logger } from '../../../infrastructure/logger';
import UserModel from '../../../infrastructure/orm/sequelize/models/User';
import { UserRepoSequelize } from './UserRepoSequelize';

const userRepoSeq = new UserRepoSequelize(UserModel, logger);

export { userRepoSeq };
