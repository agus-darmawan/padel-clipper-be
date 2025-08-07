import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from '@config/env.js';
import express, {
  type Handler,
  type NextFunction,
  type Request,
  type Response,
} from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, '../../uploads');

export const uploadStatic: Handler = express.static(uploadPath);

export const uploadHeadersMiddleware: Handler = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.setHeader('Access-Control-Allow-Origin', env.cors.origin);
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
};
