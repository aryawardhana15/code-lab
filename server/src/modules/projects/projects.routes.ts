import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  approveProject,
} from './projects.controller';
import { validate } from '../../middlewares/validate';
import {
  createProjectSchema,
  updateProjectSchema,
} from './projects.validation';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAllProjects); // Filter by published=1
router.get('/:id', getProjectById);

// Authenticated routes (student upload)
router.post('/', authRequired, validate(createProjectSchema), createProject);
router.patch('/:id', authRequired, updateProject); // Student can update their own project

// Admin/Mentor routes for moderation
router.patch('/:id/approve', authRequired, roleRequired(['mentor', 'admin']), approveProject);
router.delete('/:id', authRequired, roleRequired(['admin']), deleteProject);

export default router;
