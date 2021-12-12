import { Sequelize, Options } from 'sequelize';
import { config } from '../../../config';
import { logger } from '../../../logger';

const node_env = config.node_env;
const dbConfig = config.db[node_env];
const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};
let options: Options = {
  dialect: 'postgres',
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  // logging: () => {},
};

if (node_env === 'production' || node_env === 'development') {
  options = { ...options, dialectOptions };
}

const sequelize = new Sequelize(options);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Postgres connection has been established successfully.');
  })
  .catch(err => {
    logger.error('Unable to connect to the database', err);
  });

export { Sequelize, sequelize };
