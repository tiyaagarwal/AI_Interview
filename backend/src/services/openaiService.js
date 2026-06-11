import OpenAI from 'openai';
import { env } from '../config/env.js';

const client = env.openaiApiKey ? new OpenAI({ apiKey: env.openaiApiKey }) : null;

function fallbackJSON(schemaName) {
  if (schemaName === 'resume') return { skills: [], technologies: [], projects: [], education: [], certifications: [], experience: [], summary: 'OpenAI key missing; analysis pending.' };
  if (schemaName === 'questions') return { questions: Array.from({ length: 8 }).map((_, i) => ({ prompt: `Explain a resume-relevant concept for question ${i + 1} and connect it to your experience.`, category: i % 2 ? 'Resume' : 'Behavioral', difficulty: 'Medium', expectedSignals: ['Specific example', 'Clear tradeoffs', 'Measurable impact'], estimatedMinutes: 5 })) };
  if (schemaName === 'evaluation') return { score: 0, correctness: 0, depth: 0, communication: 0, confidence: 0, technicalAccuracy: 0, strengths: [], weaknesses: ['Evaluation unavailable until OPENAI_API_KEY is configured'], feedback: 'AI evaluation is not configured.', idealAnswer: '', followUps: [], missingConcepts: [], hallucinationRisk: 'low' };
  return {};
}

async function jsonCompletion(system, user, schemaName) {
  if (!client) return fallbackJSON(schemaName);
  const response = await client.chat.completions.create({
    model: env.openaiModel,
    response_format: { type: 'json_object' },
    temperature: 0.25,
    messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
  });
  return JSON.parse(response.choices[0].message.content);
}

export async function analyzeResumeWithAI(text) {
  return jsonCompletion(
    'You are an expert technical recruiter. Return strict JSON with skills, technologies, projects, education, certifications, experience, and summary. Never invent facts not supported by the resume.',
    `Analyze this resume and extract structured evidence-backed data. Resume:\n${text.slice(0, 20000)}`,
    'resume'
  );
}

export async function generateQuestionsWithAI({ resumeAnalysis, resumeText, role, difficulty, type, questionCount = 10 }) {
  return jsonCompletion(
    'You are a senior interviewer. Return JSON: {"questions":[{"prompt","category","difficulty","expectedSignals", "estimatedMinutes"}]}. Questions must be personalized, non-generic, and appropriate to role, difficulty, and interview type.',
    `Generate ${questionCount} interview questions. Role: ${role}. Difficulty: ${difficulty}. Type: ${type}. Include DSA/OOP/DBMS/OS/CN/resume/project/system-design when relevant; behavioral questions should support STAR answers. Resume analysis: ${JSON.stringify(resumeAnalysis || {})}. Resume text: ${resumeText?.slice(0, 12000) || 'No resume provided'}`,
    'questions'
  );
}

export async function evaluateAnswerWithAI({ question, answerText, role, difficulty }) {
  return jsonCompletion(
    'You are a rigorous interview evaluator. Return JSON with score, correctness, depth, communication, confidence, technicalAccuracy, strengths, weaknesses, feedback, idealAnswer, followUps, missingConcepts, hallucinationRisk. Score 0-10 and detect unsupported claims or hallucinations.',
    `Evaluate answer for role ${role}, difficulty ${difficulty}. Question: ${question.prompt}. Expected signals: ${question.expectedSignals?.join(', ')}. Candidate answer: ${answerText}`,
    'evaluation'
  );
}

export async function generateReportWithAI({ interview, answers }) {
  return jsonCompletion(
    'You are an interview coach. Return JSON with recommendations and summary only, grounded in answer evaluations.',
    `Create concise coaching recommendations for ${interview.role}. Answers/evaluations: ${JSON.stringify(answers).slice(0, 18000)}`,
    'report'
  );
}
