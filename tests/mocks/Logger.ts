import { ILogger } from "../../src/infrastructure/logger";

export class LoggerMock implements ILogger {

  info(){}
  error(msg, error){
    console.error(msg)
    console.error(error)
  }
  debug(){}

}

export const loggerMock = new LoggerMock();