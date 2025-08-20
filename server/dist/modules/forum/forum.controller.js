"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleForumPostLike = exports.createForumComment = exports.deleteForumPost = exports.updateForumPost = exports.getForumPostById = exports.getForumPostsByCourse = exports.createForumPost = void 0;
const forum_service_1 = require("./forum.service");
const server_1 = require("../../server"); // Import the Socket.IO instance
const createForumPost = async (req, res, next) => {
    try {
        const customReq = req;
        const postData = req.body;
        const user_id = customReq.user.id;
        const post = await (0, forum_service_1.createForumPostService)(user_id, postData);
        server_1.io.to(`forum_${post.course_id}`).emit('forum_post_created', post);
        res.status(201).json(post);
    }
    catch (error) {
        next(error);
    }
};
exports.createForumPost = createForumPost;
const getForumPostsByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const posts = await (0, forum_service_1.getForumPostsByCourseService)(Number(courseId));
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
};
exports.getForumPostsByCourse = getForumPostsByCourse;
const getForumPostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await (0, forum_service_1.getForumPostByIdService)(Number(postId));
        if (!post) {
            return res.status(404).json({ message: 'Forum post not found' });
        }
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
};
exports.getForumPostById = getForumPostById;
const updateForumPost = async (req, res, next) => {
    try {
        const customReq = req;
        const { postId } = req.params;
        const postData = req.body;
        const user_id = customReq.user.id;
        const user_role = customReq.user.role;
        const updatedPost = await (0, forum_service_1.updateForumPostService)(Number(postId), user_id, user_role, postData);
        res.status(200).json(updatedPost);
    }
    catch (error) {
        next(error);
    }
};
exports.updateForumPost = updateForumPost;
const deleteForumPost = async (req, res, next) => {
    try {
        const customReq = req;
        const { postId } = req.params;
        const user_id = customReq.user.id;
        const user_role = customReq.user.role;
        await (0, forum_service_1.deleteForumPostService)(Number(postId), user_id, user_role);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteForumPost = deleteForumPost;
const createForumComment = async (req, res, next) => {
    try {
        const customReq = req;
        const { postId } = req.params;
        const commentData = req.body;
        const user_id = customReq.user.id;
        const comment = await (0, forum_service_1.createForumCommentService)(Number(postId), user_id, commentData);
        server_1.io.to(`forum_${comment.course_id}`).emit('forum_comment_created', comment);
        res.status(201).json(comment);
    }
    catch (error) {
        next(error);
    }
};
exports.createForumComment = createForumComment;
const toggleForumPostLike = async (req, res, next) => {
    try {
        const customReq = req;
        const { postId } = req.params;
        const user_id = customReq.user.id;
        const { liked, likeCount, courseId } = await (0, forum_service_1.toggleForumPostLikeService)(Number(postId), user_id);
        server_1.io.to(`forum_${courseId}`).emit('forum_post_liked', { postId: Number(postId), liked, likeCount });
        res.status(200).json({ message: liked ? 'Post liked' : 'Post unliked', liked, likeCount });
    }
    catch (error) {
        next(error);
    }
};
exports.toggleForumPostLike = toggleForumPostLike;
