import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../middlewares/auth';
import {
  createForumPostService,
  getForumPostsByCourseService,
  getForumPostByIdService,
  updateForumPostService,
  deleteForumPostService,
  createForumCommentService,
  toggleForumPostLikeService,
} from './forum.service';
import {
  CreateForumPostInput,
  UpdateForumPostInput,
  CreateForumCommentInput,
} from './forum.validation';
import { io } from '../../server'; // Import the Socket.IO instance

export const createForumPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const postData: CreateForumPostInput = req.body;
    const user_id = customReq.user!.id;
    const post = await createForumPostService(user_id, postData);
    io.to(`forum_${post.course_id}`).emit('forum_post_created', post);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getForumPostsByCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const posts = await getForumPostsByCourseService(Number(courseId));
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getForumPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const post = await getForumPostByIdService(Number(postId));
    if (!post) {
      return res.status(404).json({ message: 'Forum post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const updateForumPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { postId } = req.params;
    const postData: Partial<UpdateForumPostInput> = req.body;
    const user_id = customReq.user!.id;
    const user_role = customReq.user!.role;

    const updatedPost = await updateForumPostService(Number(postId), user_id, user_role, postData);
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deleteForumPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { postId } = req.params;
    const user_id = customReq.user!.id;
    const user_role = customReq.user!.role;

    await deleteForumPostService(Number(postId), user_id, user_role);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const createForumComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { postId } = req.params;
    const commentData: CreateForumCommentInput = req.body;
    const user_id = customReq.user!.id;
    const comment = await createForumCommentService(Number(postId), user_id, commentData);
    io.to(`forum_${comment.course_id}`).emit('forum_comment_created', comment);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const toggleForumPostLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { postId } = req.params;
    const user_id = customReq.user!.id;
    const { liked, likeCount, courseId } = await toggleForumPostLikeService(Number(postId), user_id);
    io.to(`forum_${courseId}`).emit('forum_post_liked', { postId: Number(postId), liked, likeCount });
    res.status(200).json({ message: liked ? 'Post liked' : 'Post unliked', liked, likeCount });
  } catch (error) {
    next(error);
  }
};
