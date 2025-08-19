import { Router } from 'express';

import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';
import reportRoutes from './modules/reports/reports.routes';
import leaderboardRoutes from './modules/gamification/leaderboard.routes';
import badgeRoutes from './modules/gamification/badges.routes';
import reminderRoutes from './modules/reminders/reminders.routes';
import aiRoutes from './modules/ai/ai.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/reports', reportRoutes);
router.use('/gamification', leaderboardRoutes);
router.use('/gamification', badgeRoutes);
router.use('/reminders', reminderRoutes);
router.use('/ai', aiRoutes);

export default router;
