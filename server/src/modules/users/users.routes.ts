import { Router } from 'express';
import { authRequired, roleRequired } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import {
  getMe,
  updateMe,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './users.controller';
import {
  updateMeValidation,
  updateUserValidation,
} from './users.validation';

const router = Router();

// User-specific routes (authenticated)
router.get('/me', authRequired, getMe);
router.patch('/me', authRequired, validate(updateMeValidation), updateMe);

// Admin-specific routes
router.get('/', authRequired, roleRequired(['admin']), getAllUsers);
router.get('/:id', authRequired, roleRequired(['admin']), getUserById);
router.patch('/:id', authRequired, roleRequired(['admin']), validate(updateUserValidation), updateUser);
router.delete('/:id', authRequired, roleRequired(['admin']), deleteUser);

export default router;
