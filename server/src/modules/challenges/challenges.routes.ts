import { Router } from 'express';
import {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  submitChallenge,
  getChallengeSubmissions,
  gradeSubmission,
} from './challenges.controller';
import { validate } from '../../middlewares/validate';
import {
  createChallengeSchema,
  updateChallengeSchema,
  submitChallengeSchema,
  gradeSubmissionSchema,
} from './challenges.validation';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAllChallenges);
router.get('/:id', getChallengeById);

// Authenticated routes (student submissions)
router.post('/:challengeId/submit', authRequired, validate(submitChallengeSchema), submitChallenge);

// Admin/Mentor routes
router.post('/', authRequired, roleRequired(['mentor', 'admin']), validate(createChallengeSchema), createChallenge);
router.patch('/:id', authRequired, roleRequired(['mentor', 'admin']), validate(updateChallengeSchema), updateChallenge);
router.delete('/:id', authRequired, roleRequired(['admin']), deleteChallenge);

// Mentor/Admin for submissions
router.get('/:challengeId/submissions', authRequired, roleRequired(['mentor', 'admin']), getChallengeSubmissions);
router.patch('/submissions/:submissionId/grade', authRequired, roleRequired(['mentor', 'admin']), validate(gradeSubmissionSchema), gradeSubmission);

export default router;
