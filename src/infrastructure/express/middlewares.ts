import { NextFunction, Request, Response } from 'express';
import { IJwtHelpers } from '../../infrastructure/security/jwt';
import { IUserRepoSequelize } from '../../modules/users/repos/UserRepoSequelize';

export class ExpressMiddlewares {
  private jwtHelpers: IJwtHelpers;
  private userRepo: IUserRepoSequelize;

  constructor(jwtHelpers: IJwtHelpers, userRepo: IUserRepoSequelize) {
    this.jwtHelpers = jwtHelpers;
    this.userRepo = userRepo;
  }

  getMiddlewares = (): Function[] => {
    return [this.processJWT, this.attachUser];
  };

  processJWT = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
      return res.status(401).json({
        error: 'No Authorization header provided.',
      });

    let jwt, decoded;
    jwt = req.headers.authorization;
    jwt = jwt.replace('Bearer ', '');
    decoded = await this.jwtHelpers.isValidJWT(jwt);

    if (!jwt || !decoded) {
      return res.status(401).json({
        error: 'Invalid jwt.',
      });
    }

    const uuid = decoded.uuid;
    req['userUuid'] = uuid;
    next();
  };

  attachUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req['userUuid']) {
      const user = await this.userRepo.findByUuid(req['userUuid']);
      if (!user)
        return res.status(401).json({ error: 'Invalid user uuid jwt payload' });
      req['user'] = user;
    }

    next();
  };

}
