import express from 'express';
import { adminDashboard, userDashboard } from '../controllers/dashboardController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();
router.get('/me', protect, userDashboard);
router.get('/admin', protect, restrictTo('admin'), adminDashboard);
export default router;
