import express from 'express';
import { getResume, listResumes, uploadResume as uploadResumeController } from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';
import { uploadResume } from '../middleware/upload.js';

const router = express.Router();
router.use(protect);
router.route('/').get(listResumes).post(uploadResume, uploadResumeController);
router.get('/:id', getResume);
export default router;
