import { Router } from 'express';
import { getAIResponse } from './ai.controller';
import { authRequired } from '../../middlewares/auth';

const router = Router();

router.post('/ai/chat', authRequired, getAIResponse);

export default router;
