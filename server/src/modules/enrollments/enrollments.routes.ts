import { Router } from 'express';
import {
  enrollInCourse,
  getMyEnrollments,
  updateProgress,
} from './enrollments.controller';
import { validate } from '../../middlewares/validate';
import {
  enrollmentSchema,
  progressUpdateSchema,
} from './enrollments.validation';
import { authRequired } from '../../middlewares/auth';

const router = Router();

router.post('/', authRequired, validate(enrollmentSchema), enrollInCourse);
router.get('/me', authRequired, getMyEnrollments);
router.patch('/progress', authRequired, validate(progressUpdateSchema), updateProgress);

export default router;
