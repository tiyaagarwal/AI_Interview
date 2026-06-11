import Answer from '../models/Answer.js';
import Interview from '../models/Interview.js';
import Question from '../models/Question.js';
import Resume from '../models/Resume.js';
import Report from '../models/Report.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { evaluateAnswerWithAI, generateQuestionsWithAI } from '../services/openaiService.js';
import { buildReport } from '../services/reportService.js';

export const createInterview = catchAsync(async (req, res) => {
  const { resumeId, role, difficulty, type, questionCount = 10 } = req.body;
  const resume = resumeId ? await Resume.findOne({ _id: resumeId, user: req.user._id }) : null;
  const interview = await Interview.create({ user: req.user._id, resume: resume?._id, title: `${role} ${type} Interview`, role, difficulty, type });
  const ai = await generateQuestionsWithAI({ resumeAnalysis: resume?.analysis, resumeText: resume?.extractedText, role, difficulty, type, questionCount });
  const questions = await Question.insertMany((ai.questions || []).slice(0, questionCount).map((q, i) => ({ interview: interview._id, prompt: q.prompt, category: q.category || 'General', difficulty: q.difficulty || difficulty, expectedSignals: q.expectedSignals || [], estimatedMinutes: q.estimatedMinutes || 5, order: i })));
  interview.status = 'in_progress';
  interview.startedAt = new Date();
  await interview.save();
  res.status(201).json({ interview, questions });
});

export const listInterviews = catchAsync(async (req, res) => {
  const interviews = await Interview.find({ user: req.user._id }).sort('-createdAt').populate('resume', 'originalName');
  res.json({ interviews });
});

export const getInterview = catchAsync(async (req, res) => {
  const interview = await Interview.findOne({ _id: req.params.id, user: req.user._id }).populate('resume');
  if (!interview) throw new AppError('Interview not found', 404);
  const questions = await Question.find({ interview: interview._id }).sort('order');
  const answers = await Answer.find({ interview: interview._id, user: req.user._id });
  res.json({ interview, questions, answers });
});

export const saveAnswer = catchAsync(async (req, res) => {
  const interview = await Interview.findOne({ _id: req.params.id, user: req.user._id });
  if (!interview) throw new AppError('Interview not found', 404);
  const question = await Question.findOne({ _id: req.body.questionId, interview: interview._id });
  if (!question) throw new AppError('Question not found', 404);
  const answer = await Answer.findOneAndUpdate({ interview: interview._id, question: question._id }, { user: req.user._id, answerText: req.body.answerText, timeSpentSeconds: req.body.timeSpentSeconds || 0 }, { upsert: true, new: true, setDefaultsOnInsert: true });
  res.json({ answer });
});

export const evaluateAnswer = catchAsync(async (req, res) => {
  const answer = await Answer.findOne({ _id: req.params.answerId, user: req.user._id }).populate('question').populate('interview');
  if (!answer) throw new AppError('Answer not found', 404);
  answer.evaluation = await evaluateAnswerWithAI({ question: answer.question, answerText: answer.answerText, role: answer.interview.role, difficulty: answer.interview.difficulty });
  answer.evaluatedAt = new Date();
  await answer.save();
  res.json({ answer });
});

export const completeInterview = catchAsync(async (req, res) => {
  const interview = await Interview.findOne({ _id: req.params.id, user: req.user._id });
  if (!interview) throw new AppError('Interview not found', 404);
  const answers = await Answer.find({ interview: interview._id, user: req.user._id }).populate('question');
  interview.status = 'completed';
  interview.completedAt = new Date();
  await interview.save();
  const report = await buildReport(interview, answers);
  res.json({ interview, report });
});

export const getReport = catchAsync(async (req, res) => {
  const interview = await Interview.findOne({ _id: req.params.id, user: req.user._id });
  if (!interview) throw new AppError('Interview not found', 404);
  const report = await Report.findOne({ interview: interview._id });
  if (!report) throw new AppError('Report not found. Complete the interview first.', 404);
  res.json({ report });
});
