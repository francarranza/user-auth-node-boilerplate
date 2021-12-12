import { pino } from 'pino';
import { config } from '../config';

export interface ILogger {
  info(message: any);
  debug(message: any);
  error(message: any, error?: Error);
}

class PinoLogger implements ILogger {
  private lib;

  constructor() {
    this.lib = pino({
      prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      },
      level: config.logging.level,
    });
  }

  info(message: any) {
    this.lib.info(message);
  }

  debug(message: any) {
    this.lib.debug(message);
  }

  error(message: any, error?: Error | null) {
    this.lib.warn(message);
    this.lib.warn(error);
  }

  fatal(message: any, error?: Error) {
    this.lib.fatal(message);
    this.lib.fatal(error);
  }
}

export const logger = new PinoLogger();
