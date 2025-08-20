import { Router } from 'express';
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from './schedules.controller';
import { validate } from '../../middlewares/validate';
import {
  createScheduleSchema,
  updateScheduleSchema,
} from './schedules.validation';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

// Public routes (viewing schedules)
router.get('/', getAllSchedules); // Filter by courseId
router.get('/:id', getScheduleById);

// Admin/Mentor routes
router.post('/', authRequired, roleRequired(['mentor', 'admin']), validate(createScheduleSchema), createSchedule);
router.patch('/:id', authRequired, roleRequired(['mentor', 'admin']), validate(updateScheduleSchema), updateSchedule);
router.delete('/:id', authRequired, roleRequired(['admin']), deleteSchedule);

export default router;
