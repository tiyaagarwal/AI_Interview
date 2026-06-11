import express from 'express';
import { completeInterview, createInterview, evaluateAnswer, getInterview, getReport, listInterviews, saveAnswer } from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { answerRules, createInterviewRules } from '../validators/interviewValidators.js';

const router = express.Router();
router.use(protect);
router.route('/').get(listInterviews).post(createInterviewRules, validate, createInterview);
router.get('/:id', getInterview);
router.post('/:id/answers', answerRules, validate, saveAnswer);
router.post('/answers/:answerId/evaluate', evaluateAnswer);
router.post('/:id/complete', completeInterview);
router.get('/:id/report', getReport);
export default router;
