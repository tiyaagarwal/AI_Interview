import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({ topic: String, score: Number, total: Number, attempted: Number }, { _id: false });

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  interview: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true, unique: true },
  overallScore: Number,
  technicalScore: Number,
  communicationScore: Number,
  behavioralScore: Number,
  radar: [{ metric: String, score: Number }],
  topicBreakdown: [topicSchema],
  recommendations: [String],
  weakestTopics: [String],
  strongestTopics: [String],
  summary: String
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
