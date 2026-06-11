import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  title: { type: String, required: true },
  role: { type: String, required: true, enum: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst', 'Data Scientist', 'Product Manager'] },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  type: { type: String, required: true, enum: ['Technical', 'Behavioral', 'HR', 'Mixed'] },
  status: { type: String, enum: ['draft', 'in_progress', 'completed'], default: 'draft', index: true },
  currentQuestionIndex: { type: Number, default: 0 },
  durationMinutes: { type: Number, default: 45 },
  startedAt: Date,
  completedAt: Date
}, { timestamps: true });

interviewSchema.index({ user: 1, createdAt: -1 });
export default mongoose.model('Interview', interviewSchema);
