import DatauriParser from 'datauri/parser.js';
import path from 'path';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';
import cloudinary from '../config/cloudinary.js';
import { AppError } from '../utils/AppError.js';

const parser = new DatauriParser();

export async function uploadBufferToCloudinary(file) {
  const dataUri = parser.format(path.extname(file.originalname), file.buffer).content;
  const result = await cloudinary.uploader.upload(dataUri, { folder: 'ai-interview/resumes', resource_type: 'auto' });
  return { fileUrl: result.secure_url, publicId: result.public_id };
}

export async function extractResumeText(file) {
  if (file.mimetype === 'application/pdf') {
    const parsed = await pdf(file.buffer);
    return parsed.text.trim();
  }
  if (file.mimetype.includes('wordprocessingml')) {
    const parsed = await mammoth.extractRawText({ buffer: file.buffer });
    return parsed.value.trim();
  }
  throw new AppError('Unsupported resume format', 400);
}
