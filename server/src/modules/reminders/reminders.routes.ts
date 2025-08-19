import { Router } from 'express';
import { sendReminderEmail } from './reminders.controller';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

// This route could be triggered by a cron job or manually for testing
router.post('/admin/reminders/send', authRequired, roleRequired(['admin']), sendReminderEmail);

export default router;
