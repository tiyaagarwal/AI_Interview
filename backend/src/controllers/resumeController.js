import Resume from '../models/Resume.js';
import { catchAsync } from '../utils/catchAsync.js';
import { analyzeResumeWithAI } from '../services/openaiService.js';
import { extractResumeText, uploadBufferToCloudinary } from '../services/resumeService.js';

export const uploadResume = catchAsync(async (req, res) => {
  const extractedText = await extractResumeText(req.file);
  const upload = await uploadBufferToCloudinary(req.file);
  const analysis = await analyzeResumeWithAI(extractedText);
  const resume = await Resume.create({
    user: req.user._id,
    originalName: req.file.originalname,
    fileUrl: upload.fileUrl,
    cloudinaryPublicId: upload.publicId,
    mimeType: req.file.mimetype,
    size: req.file.size,
    extractedText,
    analysis,
    analyzedAt: new Date()
  });
  res.status(201).json({ resume });
});

export const listResumes = catchAsync(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort('-createdAt');
  res.json({ resumes });
});

export const getResume = catchAsync(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
  if (!resume) return res.status(404).json({ message: 'Resume not found' });
  res.json({ resume });
});
