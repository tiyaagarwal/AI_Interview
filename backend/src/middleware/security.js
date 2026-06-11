import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import { env } from '../config/env.js';

export const corsMiddleware = cors({ origin: env.clientUrl.split(','), credentials: true });
export const helmetMiddleware = helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } });
export const sanitizeMiddleware = [mongoSanitize(), xss()];
export const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'fail', message: 'Too many requests, please try again later.' }
});
