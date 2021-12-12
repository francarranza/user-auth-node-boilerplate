try {
  const dotenv = require('dotenv');
  dotenv.config();
} catch (err) {
  console.warn('dotenv not found');
}

type Database = {
  host: string;
  database: string;
  username: string;
  password: string;
  port: number;
};

export interface HttpConfig {
  host: string;
  port: number;
  prefix: string;
  baseUrl: string;
}

export interface IConfig {
  node_env: string;
  jwt: {
    expiration: string;
    secret: string;
  };
  http: HttpConfig;
  db: {
    local: Database;
    development: Database;
    production: Database;
    test: Database;
  };
  logging: {
    level: string;
    path: string;
  };
}

export const config: IConfig = {
  node_env: process.env.NODE_ENV || 'development',
  jwt: {
    expiration: process.env.JWT_EXPIRATION || '2d',
    secret: process.env.JWT_SECRET || '',
  },
  http: {
    host: process.env.API_HOST || 'http://localhost',
    port: parseInt(process.env.PORT || '') || 8080,
    prefix: '/api',
    baseUrl: process.env.API_PUBLIC_URL + '/api' || 'http://localhost:8080/api',
  },
  db: {
    local: {
      host: process.env.DB_HOST || '',
      database: process.env.DB_NAME || '',
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || ''),
    },
    development: {
      host: process.env.DB_HOST || '',
      database: process.env.DB_NAME || '',
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || ''),
    },
    production: {
      host: process.env.DB_HOST || '',
      database: process.env.DB_NAME || '',
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || ''),
    },
    test: {
      host: 'localhost',
      database: 'node_boilerplate_test',
      username: 'test',
      password: 'test',
      port: 5433,
    },
  },
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    path: process.env.LOG_PATH || '',
  },
};
