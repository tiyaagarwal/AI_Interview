import Report from '../models/Report.js';
import { generateReportWithAI } from './openaiService.js';

const avg = (nums) => nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;

export async function buildReport(interview, answers) {
  const evaluations = answers.map((a) => a.evaluation).filter(Boolean);
  const scores = evaluations.map((e) => e.score || 0);
  const topicMap = new Map();
  answers.forEach((answer) => {
    const topic = answer.question.category;
    const current = topicMap.get(topic) || { topic, score: 0, total: 0, attempted: 0 };
    current.score += answer.evaluation?.score || 0;
    current.total += 10;
    current.attempted += 1;
    topicMap.set(topic, current);
  });
  const topicBreakdown = [...topicMap.values()].map((t) => ({ ...t, score: Number(((t.score / t.total) * 10).toFixed(1)) }));
  const ai = await generateReportWithAI({ interview, answers });
  const report = await Report.findOneAndUpdate({ interview: interview._id }, {
    user: interview.user,
    interview: interview._id,
    overallScore: Number(avg(scores).toFixed(1)),
    technicalScore: Number(avg(evaluations.map((e) => e.technicalAccuracy || e.score || 0)).toFixed(1)),
    communicationScore: Number(avg(evaluations.map((e) => e.communication || 0)).toFixed(1)),
    behavioralScore: Number(avg(answers.filter((a) => ['Behavioral', 'HR'].includes(a.question.category)).map((a) => a.evaluation?.score || 0)).toFixed(1)),
    radar: ['correctness', 'depth', 'communication', 'confidence', 'technicalAccuracy'].map((metric) => ({ metric, score: Number(avg(evaluations.map((e) => e[metric] || 0)).toFixed(1)) })),
    topicBreakdown,
    recommendations: ai.recommendations || ['Practice concise, structured answers with concrete examples.'],
    weakestTopics: topicBreakdown.sort((a, b) => a.score - b.score).slice(0, 3).map((t) => t.topic),
    strongestTopics: topicBreakdown.sort((a, b) => b.score - a.score).slice(0, 3).map((t) => t.topic),
    summary: ai.summary || 'Report generated from evaluated interview answers.'
  }, { upsert: true, new: true });
  return report;
}
