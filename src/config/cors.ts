import { env } from '@config/env.js';
import cors from 'cors';

export const corsConfig = cors({
  origin: env.cors.origin,
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
