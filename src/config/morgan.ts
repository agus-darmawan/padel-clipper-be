import logger from '@config/logger.js';
import type { Request, Response } from 'express';
import morgan from 'morgan';

morgan.token('response-time', (_req: Request, res: Response) => {
  const responseTime = res.getHeader('X-Response-Time');
  return responseTime ? String(responseTime) : '0';
});

const format = ':method :url :status :res[content-length] - :response-time ms';

export const morganConfig = morgan(format, {
  stream: {
    write: (message: string) => {
      logger.info(message.trim());
    },
  },
});
