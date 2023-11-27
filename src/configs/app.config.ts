require('dotenv').config();

// ========= Helpers ============ //

const missingEnvironmentVariables: string[] = [];

const getEnvironmentVariable = <T>(name: string, fallback?: string | T): string => {
  const value = process.env[name] || fallback;

  if (!value && fallback === undefined) {
    missingEnvironmentVariables.push(name);
  }

  return String(value);
};

const toBoolean = (string: string): boolean => string.toLowerCase().trim() === 'true';
const toNumber = (string: string): number => {
  const number = Number(string);
  const fallback = 0;
  return !isNaN(number) ? number : fallback;
};

// ===== Env Var declarations ===== //

const node_env = getEnvironmentVariable('NODE_ENV').toLowerCase().trim();
export const NODE_ENV = node_env === 'undefined' ? 'development' : node_env;
export const IS_DEV = NODE_ENV === 'development';
export const IS_PROD = NODE_ENV === 'production';

// ======== Client/Server ======== //

export const SERVER_PORT = toNumber(getEnvironmentVariable('SERVER_PORT', '8000'));
export const SERVER_HOSTNAME = getEnvironmentVariable('SERVER_HOSTNAME', IS_PROD ? 'www.changeme.com' : `0.0.0.0`);
export const CLIENT_ORIGIN = getEnvironmentVariable('CLIENT_ORIGIN', 'http://localhost:3000');

// ========== Database ========== //

// Dev database
export const DB_DEV_DATABASE = getEnvironmentVariable('DB_DEV_DATABASE', 'pixlz');
export const DB_DEV_HOSTNAME = getEnvironmentVariable('DB_DEV_HOSTNAME', 'localhost');
export const DB_DEV_PASSWORD = getEnvironmentVariable('DB_DEV_PASSWORD', '');
export const DB_DEV_USERNAME = getEnvironmentVariable('DB_DEV_USERNAME', '');
export const DB_DEV_PORT = toNumber(getEnvironmentVariable('DB_DEV_PORT', '27017'));

// Prod database
export const DB_PROD_DATABASE = IS_PROD ? getEnvironmentVariable('DB_PROD_DATABASE') : '';
export const DB_PROD_HOSTNAME = IS_PROD ? getEnvironmentVariable('DB_PROD_HOSTNAME') : '';
export const DB_PROD_PASSWORD = IS_PROD ? getEnvironmentVariable('DB_PROD_PASSWORD') : '';
export const DB_PROD_USERNAME = IS_PROD ? getEnvironmentVariable('DB_PROD_USERNAME') : '';
export const DB_PROD_PORT = toNumber(getEnvironmentVariable('DB_PROD_PORT', ''));

// ======== Encryption ======== //

export const SALT_ROUNDS = toNumber(getEnvironmentVariable('SALT_ROUNDS', '10'));
export const ENCRYPTION_KEY = getEnvironmentVariable('ENCRYPTION_KEY', '');

// ========= Cookies ========= //

export const COOKIE_KEY = getEnvironmentVariable('COOKIE_KEY', '');

// ========== Misc =========== //

export const LOGGING = toBoolean(getEnvironmentVariable('logging', 'true'));
