import { env } from '@config/env.js';
import logger from '@config/logger.js';
import type { Request, Response } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler = (
  error: ErrorWithStatus,
  req: Request,
  res: Response,
): void => {
  logger.error({
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  const statusCode = error.status || error.statusCode || 500;
  const isDevelopment = env.app.env === 'development';

  res.status(statusCode).json({
    error: error.message || 'Internal Server Error',
    status: statusCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    ...(isDevelopment && { stack: error.stack }),
  });
};
