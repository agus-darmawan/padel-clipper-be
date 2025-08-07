import { env } from '@config/env.js';

const config = {
  development: {
    username: env.database.user,
    password: env.database.password,
    database: env.database.name,
    host: env.database.host,
    port: env.database.port,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: env.database.user,
    password: env.database.password,
    database: `${env.database.name}_test`,
    host: env.database.host,
    port: env.database.port,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: env.database.user,
    password: env.database.password,
    database: `${env.database.name}_production`,
    host: env.database.host,
    port: env.database.port,
    dialect: 'postgres',
    logging: false,
  },
};

export default config;
