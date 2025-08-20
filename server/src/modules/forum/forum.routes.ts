import { Router } from 'express';
import {
  createForumPost,
  getForumPostsByCourse,
  getForumPostById,
  updateForumPost,
  deleteForumPost,
  createForumComment,
  toggleForumPostLike,
} from './forum.controller';
import { validate } from '../../middlewares/validate';
import {
  createForumPostSchema,
  updateForumPostSchema,
  createForumCommentSchema,
} from './forum.validation';
import { authRequired, roleRequired } from '../../middlewares/auth';

const router = Router();

// Public routes (viewing posts and comments)
router.get('/courses/:courseId/posts', getForumPostsByCourse);
router.get('/posts/:postId', getForumPostById);

// Authenticated routes
router.post('/posts', authRequired, validate(createForumPostSchema), createForumPost);
router.patch('/posts/:postId', authRequired, validate(updateForumPostSchema), updateForumPost);
router.delete('/posts/:postId', authRequired, deleteForumPost); // Admin/Mentor can delete any, user can delete their own

router.post('/posts/:postId/comments', authRequired, validate(createForumCommentSchema), createForumComment);
router.post('/posts/:postId/like', authRequired, toggleForumPostLike);

export default router;
