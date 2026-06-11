import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema({
  score: { type: Number, min: 0, max: 10 },
  correctness: Number,
  depth: Number,
  communication: Number,
  confidence: Number,
  technicalAccuracy: Number,
  strengths: [String],
  weaknesses: [String],
  feedback: String,
  idealAnswer: String,
  followUps: [String],
  missingConcepts: [String],
  hallucinationRisk: { type: String, enum: ['low', 'medium', 'high'], default: 'low' }
}, { _id: false });

const answerSchema = new mongoose.Schema({
  interview: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true, index: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  answerText: { type: String, default: '' },
  timeSpentSeconds: { type: Number, default: 0 },
  evaluation: evaluationSchema,
  evaluatedAt: Date
}, { timestamps: true });

answerSchema.index({ interview: 1, question: 1 }, { unique: true });
export default mongoose.model('Answer', answerSchema);
