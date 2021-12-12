import { IConfig } from '../config';
import { ILogger } from '../logger';
import * as jwt from 'jsonwebtoken';

export class JwtError extends Error {}
export class InvalidJwtError extends Error {}

export interface IJwtHelpers {
  generateJWT(payload: any): Promise<string>;
  isValidJWT(token: string): Promise<boolean>;
}

export class JwtHelpers implements IJwtHelpers {
  private logger: ILogger;
  private config: IConfig;
  private jwtLib;

  constructor(config: IConfig, logger: ILogger) {
    this.logger = logger;
    this.config = config;
    this.jwtLib = jwt;
  }

  async generateJWT(payload: any) {
    const opts = { expiresIn: this.config.jwt.expiration };
    const secret = this.config.jwt.secret;
    try {
      const signed = this.jwtLib.sign(payload, secret, opts);
      this.logger.debug(`generateJWT: success`);
      return signed;
    } catch (err) {
      this.logger.error(err);
      throw new JwtError(err);
    }
  }

  async isValidJWT(token: string) {
    if (!token) return false;
    try {
      return this.jwtLib.verify(token, this.config.jwt.secret);
    } catch (err) {
      this.logger.debug(
        `JwtHelpers.isValidJWT: Error verifying ${err.message}`,
      );
      return false;
    }
  }
}
