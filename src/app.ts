import { setupErrorHandlers, setupMiddleware } from '@middleware/index.js';
import express, { type Request, type Response } from 'express';
import {
  uploadHeadersMiddleware,
  uploadStatic,
} from '@/middleware/upload.middleware.js';
import v1Routes from '@/routes/index.js';

const createApp = (): express.Application => {
  const app = express();

  setupMiddleware(app);

  app.use('/api', v1Routes);

  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Welcome to the Padel BE API',
      timestamp: new Date().toISOString(),
      author: 'I Wayan Agus Darmawan',
      version: '1.0.0',
    });
  });
  app.use('/uploads', uploadHeadersMiddleware, uploadStatic);

  setupErrorHandlers(app);
  return app;
};

export default createApp;
