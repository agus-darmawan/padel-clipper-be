import fs from 'node:fs';
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

export const streamVideoMiddleware: Handler = (req, res, next) => {
  const filePath = path.join(uploadPath, req.path);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  if (!filePath.match(/\.(mp4|webm|ogg)$/i)) {
    return next();
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    res.status(416).send('Range header required');
    return;
  }

  const parts = range.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0] || '0', 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'video/mp4',
  });

  const stream = fs.createReadStream(filePath, { start, end });
  stream.pipe(res);
};

export const uploadStatic: Handler = express.static(uploadPath);
