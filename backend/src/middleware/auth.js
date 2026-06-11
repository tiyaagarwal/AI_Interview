import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const protect = catchAsync(async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new AppError('Authentication token required', 401);
  const decoded = jwt.verify(header.split(' ')[1], env.jwtSecret);
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError('User no longer exists', 401);
  req.user = user;
  next();
});

export const restrictTo = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) throw new AppError('Insufficient permissions', 403);
  next();
};
