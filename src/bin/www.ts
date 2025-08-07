import { syncDatabase } from '@config/database.js';
import { env } from '@config/env.js';
import logger from '@config/logger.js';
import { findAvailablePort } from '@utils/port.js';
import createApp from '@/app.js';

const startServer = async (): Promise<void> => {
  try {
    logger.info('🔄 Initializing database...');
    await syncDatabase();
    logger.info('✅ Database connected successfully');

    const app = createApp();

    const availablePort = await findAvailablePort(env.app.port);
    if (availablePort !== env.app.port) {
      logger.warn(`Port ${env.app.port} busy, using port ${availablePort}`);
    }

    const server = app.listen(availablePort, '0.0.0.0', () => {
      logger.info(`🚀 Server running on port ${availablePort}`);
      logger.info(`📊 Health: http://localhost:${availablePort}/api/v1/health`);
      logger.info(`🌍 Environment: ${env.app.env}`);
    });

    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}, shutting down...`);
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error as Error);
    process.exit(1);
  }
};

startServer();
