import { Router } from 'express';
import {
  getMyNotifications,
  markNotificationAsRead,
} from './notifications.controller';
import { authRequired } from '../../middlewares/auth';

const router = Router();

router.get('/me', authRequired, getMyNotifications);
router.patch('/:id/read', authRequired, markNotificationAsRead);

export default router;
