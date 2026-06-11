import multer from 'multer';
import { AppError } from '../utils/AppError.js';

const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const uploadResume = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) return cb(new AppError('Only PDF and DOCX resumes are allowed', 400));
    cb(null, true);
  }
}).single('resume');
