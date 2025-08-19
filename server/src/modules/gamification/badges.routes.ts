import { Router } from 'express';
import { getBadges, assignBadge, revokeBadge } from './badges.controller';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

router.get('/badges', getBadges);
router.post('/admin/badges/assign', authRequired, roleRequired(['admin']), assignBadge);
router.post('/admin/badges/revoke', authRequired, roleRequired(['admin']), revokeBadge);

export default router;
