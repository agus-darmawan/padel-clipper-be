import { config } from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
config({ path: envFile });

interface EnvConfig {
  app: {
    port: number;
    env: string;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  cors: {
    origin: string;
  };
}

const getEnvConfig = (): EnvConfig => {
  return {
    app: {
      port: parseInt(process.env.PORT || '3000', 10),
      env: process.env.NODE_ENV || 'development',
    },
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      name: process.env.DB_NAME || 'database',
    },
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },
  };
};

export const env = getEnvConfig();
