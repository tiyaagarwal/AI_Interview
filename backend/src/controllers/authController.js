import crypto from 'crypto';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { signToken } from '../utils/jwt.js';

const sendAuth = (res, user, status = 200) => res.status(status).json({ token: signToken(user._id), user });

export const register = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  sendAuth(res, user, 201);
});

export const login = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) throw new AppError('Invalid email or password', 401);
  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });
  sendAuth(res, user);
});

export const forgotPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    user.resetPasswordToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
  }
  res.json({ message: 'If an account exists, reset instructions have been generated.' });
});

export const me = catchAsync(async (req, res) => res.json({ user: req.user }));
export const updateProfile = catchAsync(async (req, res) => {
  const allowed = ['name', 'targetRole', 'bio', 'avatarUrl'];
  allowed.forEach((field) => { if (req.body[field] !== undefined) req.user[field] = req.body[field]; });
  await req.user.save();
  res.json({ user: req.user });
});
