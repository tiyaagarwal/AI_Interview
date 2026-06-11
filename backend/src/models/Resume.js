import mongoose from 'mongoose';

const resumeAnalysisSchema = new mongoose.Schema({
  skills: [String],
  technologies: [String],
  projects: [{ name: String, description: String, technologies: [String], impact: String }],
  education: [String],
  certifications: [String],
  experience: [{ company: String, role: String, duration: String, highlights: [String] }],
  summary: String
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  originalName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  cloudinaryPublicId: String,
  mimeType: String,
  size: Number,
  extractedText: { type: String, required: true },
  analysis: resumeAnalysisSchema,
  analyzedAt: Date
}, { timestamps: true });

resumeSchema.index({ user: 1, createdAt: -1 });
export default mongoose.model('Resume', resumeSchema);
