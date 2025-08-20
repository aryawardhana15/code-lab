import { Router } from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  reorderMaterials,
} from './courses.controller';
import { validate } from '../../middlewares/validate';
import {
  createCourseSchema,
  updateCourseSchema,
  createMaterialSchema,
  updateMaterialSchema,
  reorderMaterialsSchema,
} from './courses.validation';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.get('/:id/materials', getCourseMaterials);

// Admin/Mentor routes for courses
router.post('/', authRequired, roleRequired(['mentor', 'admin']), validate(createCourseSchema), createCourse);
router.patch('/:id', authRequired, roleRequired(['mentor', 'admin']), validate(updateCourseSchema), updateCourse);
router.delete('/:id', authRequired, roleRequired(['admin']), deleteCourse);

// Admin/Mentor routes for materials
router.post('/:id/materials', authRequired, roleRequired(['mentor', 'admin']), validate(createMaterialSchema), createMaterial);
router.patch('/:courseId/materials/:materialId', authRequired, roleRequired(['mentor', 'admin']), validate(updateMaterialSchema), updateMaterial);
router.delete('/:courseId/materials/:materialId', authRequired, roleRequired(['admin']), deleteMaterial);
router.post('/:id/materials/reorder', authRequired, roleRequired(['mentor', 'admin']), validate(reorderMaterialsSchema), reorderMaterials);

export default router;
