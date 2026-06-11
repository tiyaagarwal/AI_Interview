import { body, param } from 'express-validator';

const roles = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst', 'Data Scientist', 'Product Manager'];
export const createInterviewRules = [
  body('resumeId').optional().isMongoId(),
  body('role').isIn(roles),
  body('difficulty').isIn(['Easy', 'Medium', 'Hard']),
  body('type').isIn(['Technical', 'Behavioral', 'HR', 'Mixed']),
  body('questionCount').optional().isInt({ min: 5, max: 20 })
];
export const answerRules = [param('id').isMongoId(), body('questionId').isMongoId(), body('answerText').trim().isLength({ min: 1, max: 12000 }), body('timeSpentSeconds').optional().isInt({ min: 0 })];
