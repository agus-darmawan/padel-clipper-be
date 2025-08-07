import { env } from '@config/env.js';
import logger from '@config/logger.js';
import { Client } from 'pg';
import { Sequelize } from 'sequelize';

const ensureDatabaseExists = async () => {
  const client = new Client({
    user: env.database.user,
    host: env.database.host,
    database: 'postgres',
    password: env.database.password,
    port: env.database.port,
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${env.database.name}'`,
    );
    if (res.rowCount === 0) {
      logger.info(`Database ${env.database.name} does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${env.database.name}"`);
      logger.info(`Database ${env.database.name} created successfully.`);
    } else {
      logger.info(`Database ${env.database.name} already exists.`);
    }
  } catch (error) {
    logger.error('Error ensuring database exists:', error as Error);
  } finally {
    await client.end();
  }
};

const sequelize = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.password,
  {
    host: env.database.host,
    port: env.database.port,
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true,
      underscored: false,
    },
  },
);

export const syncDatabase = async () => {
  await ensureDatabaseExists();
  try {
    await sequelize.authenticate();
    logger.info(
      'Connection to the database has been established successfully.',
    );

    logger.info('Importing models...');

    const { BookingHour, Clipp, Court } = await import(
      '@/database/models/index.js'
    );

    logger.info('All models imported. Starting synchronization...');

    const syncOrder = [
      { name: 'Court', model: Court },
      { name: 'BookingHour', model: BookingHour },
      { name: 'Clipp', model: Clipp },
    ];

    for (const { name, model } of syncOrder) {
      try {
        logger.info(`Syncing ${name}...`);
        await model.sync({ force: false, alter: false });
        logger.info(`✅ ${name} synced successfully`);
      } catch (error) {
        logger.error(`❌ Failed to sync ${name}:`, error as Error);
        logger.error('Error details:', (error as Error).message);
        throw new Error(
          `Failed to sync model ${name}: ${(error as Error).message}`,
        );
      }
    }

    logger.info('Database synchronized successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error as Error);
    throw error;
  }
};

export default sequelize;
