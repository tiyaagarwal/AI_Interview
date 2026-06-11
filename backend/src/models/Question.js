import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  interview: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true, index: true },
  prompt: { type: String, required: true },
  category: { type: String, enum: ['DSA', 'OOP', 'DBMS', 'OS', 'CN', 'Resume', 'Behavioral', 'Project', 'System Design', 'HR', 'General'], default: 'General' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  expectedSignals: [String],
  order: { type: Number, required: true },
  estimatedMinutes: { type: Number, default: 5 }
}, { timestamps: true });

questionSchema.index({ interview: 1, order: 1 }, { unique: true });
export default mongoose.model('Question', questionSchema);
