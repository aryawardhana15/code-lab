import { Router } from 'express';
import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial,
} from './testimonials.controller';
import { validate } from '../../middlewares/validate';
import {
  createTestimonialSchema,
  updateTestimonialSchema,
} from './testimonials.validation';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAllTestimonials); // Filter by approved=1
router.get('/:id', getTestimonialById);

// Authenticated routes (student submit)
router.post('/', authRequired, validate(createTestimonialSchema), createTestimonial);

// Admin routes for moderation
router.patch('/:id', authRequired, roleRequired(['admin']), validate(updateTestimonialSchema), updateTestimonial);
router.patch('/:id/approve', authRequired, roleRequired(['admin']), approveTestimonial);
router.delete('/:id', authRequired, roleRequired(['admin']), deleteTestimonial);

export default router;
