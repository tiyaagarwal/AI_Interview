import Interview from '../models/Interview.js';
import Report from '../models/Report.js';
import User from '../models/User.js';
import Answer from '../models/Answer.js';
import { catchAsync } from '../utils/catchAsync.js';

export const userDashboard = catchAsync(async (req, res) => {
  const [interviews, reports] = await Promise.all([
    Interview.find({ user: req.user._id }).sort('-createdAt').limit(10),
    Report.find({ user: req.user._id }).sort('createdAt')
  ]);
  const averageScore = reports.length ? reports.reduce((s, r) => s + (r.overallScore || 0), 0) / reports.length : 0;
  const topicPerformance = reports.flatMap((r) => r.topicBreakdown).reduce((acc, t) => {
    const item = acc[t.topic] || { topic: t.topic, score: 0, count: 0 };
    item.score += t.score; item.count += 1; acc[t.topic] = item; return acc;
  }, {});
  res.json({
    stats: { totalInterviews: interviews.length, averageScore: Number(averageScore.toFixed(1)), completed: interviews.filter((i) => i.status === 'completed').length },
    trend: reports.map((r) => ({ date: r.createdAt, score: r.overallScore })),
    topicPerformance: Object.values(topicPerformance).map((t) => ({ topic: t.topic, score: Number((t.score / t.count).toFixed(1)) })),
    history: interviews
  });
});

export const adminDashboard = catchAsync(async (_req, res) => {
  const [totalUsers, interviewsConducted, reports, evaluatedAnswers] = await Promise.all([
    User.countDocuments(), Interview.countDocuments(), Report.find(), Answer.countDocuments({ evaluatedAt: { $exists: true } })
  ]);
  const averageScore = reports.length ? reports.reduce((s, r) => s + (r.overallScore || 0), 0) / reports.length : 0;
  res.json({ stats: { totalUsers, interviewsConducted, averageScore: Number(averageScore.toFixed(1)), aiUsage: { evaluatedAnswers, reportsGenerated: reports.length } } });
});
