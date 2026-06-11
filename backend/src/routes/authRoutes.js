import express from 'express';
import { forgotPassword, login, me, register, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { forgotPasswordRules, loginRules, registerRules } from '../validators/authValidators.js';

const router = express.Router();
router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.post('/forgot-password', forgotPasswordRules, validate, forgotPassword);
router.get('/me', protect, me);
router.patch('/profile', protect, updateProfile);
export default router;
