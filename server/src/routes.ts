import { Router } from 'express';

import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';
import reportRoutes from './modules/reports/reports.routes';
import leaderboardRoutes from './modules/gamification/leaderboard.routes';
import badgeRoutes from './modules/gamification/badges.routes';
import reminderRoutes from './modules/reminders/reminders.routes';
import aiRoutes from './modules/ai/ai.routes';
import courseRoutes from './modules/courses/courses.routes';
import enrollmentRoutes from './modules/enrollments/enrollments.routes';
import forumRoutes from './modules/forum/forum.routes';
import challengeRoutes from './modules/challenges/challenges.routes';
import projectRoutes from './modules/projects/projects.routes';
import testimonialRoutes from './modules/testimonials/testimonials.routes';
import scheduleRoutes from './modules/schedules/schedules.routes';
import notificationRoutes from './modules/notifications/notifications.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/reports', reportRoutes);
router.use('/gamification', leaderboardRoutes);
router.use('/gamification', badgeRoutes);
router.use('/reminders', reminderRoutes);
router.use('/ai', aiRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/forum', forumRoutes);
router.use('/challenges', challengeRoutes);
router.use('/projects', projectRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/notifications', notificationRoutes);

export default router;
