import * as appConfig from './app.config';

interface DBEnvConfig {
  hostname: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

type DBConfig = {
  development: DBEnvConfig;
  production: DBEnvConfig;
};

const dbConfig: DBConfig = {
  development: {
    hostname: appConfig.DB_DEV_HOSTNAME,
    port: appConfig.DB_DEV_PORT,
    username: appConfig.DB_DEV_USERNAME,
    password: appConfig.DB_DEV_PASSWORD,
    database: appConfig.DB_DEV_DATABASE,
  },
  production: {
    hostname: appConfig.DB_PROD_HOSTNAME,
    port: appConfig.DB_PROD_PORT,
    username: appConfig.DB_PROD_USERNAME,
    password: appConfig.DB_PROD_PASSWORD,
    database: appConfig.DB_PROD_DATABASE,
  },
};

let config = {} as DBEnvConfig;
switch (appConfig.NODE_ENV) {
  case 'development':
    config = dbConfig.development;
    break;
  case 'production':
    config = dbConfig.production;
    break;
  default:
    throw new Error(
      `NODE_ENV invalid for db config. Valid values: development, production - Current value: ${appConfig.NODE_ENV}`,
    );
}

export default config;
