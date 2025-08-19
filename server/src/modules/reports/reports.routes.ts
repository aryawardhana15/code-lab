import { Router } from 'express';
import { exportReports } from './reports.controller';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

router.get('/admin/reports/:type', authRequired, roleRequired(['admin']), exportReports);

export default router;
