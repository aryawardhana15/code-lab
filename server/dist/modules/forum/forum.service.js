"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleForumPostLikeService = exports.createForumCommentService = exports.deleteForumPostService = exports.updateForumPostService = exports.getForumPostByIdService = exports.getForumPostsByCourseService = exports.createForumPostService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createForumPostService = async (userId, postData) => {
    const { course_id, title, content } = postData;
    const [result] = await db_1.default.execute('INSERT INTO forum_posts (course_id, user_id, title, content) VALUES (?, ?, ?, ?)', [course_id, userId, title, content]);
    const postId = result.insertId;
    const [rows] = await db_1.default.execute(`SELECT fp.*, u.name as user_name, u.role as user_role
     FROM forum_posts fp
     JOIN users u ON fp.user_id = u.id
     WHERE fp.id = ?`, [postId]);
    return rows[0];
};
exports.createForumPostService = createForumPostService;
const getForumPostsByCourseService = async (courseId) => {
    const [rows] = await db_1.default.execute(`SELECT fp.*, u.name as user_name, u.role as user_role,
            (SELECT COUNT(*) FROM forum_comments fc WHERE fc.post_id = fp.id) as comment_count,
            (SELECT COUNT(*) FROM forum_likes fl WHERE fl.post_id = fp.id) as like_count
     FROM forum_posts fp
     JOIN users u ON fp.user_id = u.id
     WHERE fp.course_id = ?
     ORDER BY fp.created_at DESC`, [courseId]);
    return rows;
};
exports.getForumPostsByCourseService = getForumPostsByCourseService;
const getForumPostByIdService = async (postId) => {
    const [rows] = await db_1.default.execute(`SELECT fp.*, u.name as user_name, u.role as user_role,
            (SELECT COUNT(*) FROM forum_likes fl WHERE fl.post_id = fp.id) as like_count
     FROM forum_posts fp
     JOIN users u ON fp.user_id = u.id
     WHERE fp.id = ?`, [postId]);
    const post = rows[0];
    if (post) {
        const [commentsRows] = await db_1.default.execute(`SELECT fc.*, u.name as user_name, u.role as user_role
       FROM forum_comments fc
       JOIN users u ON fc.user_id = u.id
       WHERE fc.post_id = ?
       ORDER BY fc.created_at ASC`, [postId]);
        post.comments = commentsRows;
    }
    return post;
};
exports.getForumPostByIdService = getForumPostByIdService;
const updateForumPostService = async (postId, userId, userRole, postData) => {
    const [postRows] = await db_1.default.execute('SELECT * FROM forum_posts WHERE id = ?', [postId]);
    const post = postRows[0];
    if (!post) {
        throw new Error('Forum post not found');
    }
    // Only allow owner or admin/mentor to update
    if (post.user_id !== userId && !['admin', 'mentor'].includes(userRole)) {
        throw new Error('Unauthorized to update this post');
    }
    const fields = Object.keys(postData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(postData);
    if (fields.length === 0) {
        return post;
    }
    await db_1.default.execute(`UPDATE forum_posts SET ${fields} WHERE id = ?`, [...values, postId]);
    const [updatedRows] = await db_1.default.execute(`SELECT fp.*, u.name as user_name, u.role as user_role
     FROM forum_posts fp
     JOIN users u ON fp.user_id = u.id
     WHERE fp.id = ?`, [postId]);
    return updatedRows[0];
};
exports.updateForumPostService = updateForumPostService;
const deleteForumPostService = async (postId, userId, userRole) => {
    const [postRows] = await db_1.default.execute('SELECT * FROM forum_posts WHERE id = ?', [postId]);
    const post = postRows[0];
    if (!post) {
        throw new Error('Forum post not found');
    }
    // Only allow owner or admin/mentor to delete
    if (post.user_id !== userId && !['admin', 'mentor'].includes(userRole)) {
        throw new Error('Unauthorized to delete this post');
    }
    await db_1.default.execute('DELETE FROM forum_posts WHERE id = ?', [postId]);
};
exports.deleteForumPostService = deleteForumPostService;
const createForumCommentService = async (postId, userId, commentData) => {
    const { content } = commentData;
    const [result] = await db_1.default.execute('INSERT INTO forum_comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content]);
    const commentId = result.insertId;
    const [rows] = await db_1.default.execute(`SELECT fc.*, u.name as user_name, u.role as user_role, fp.course_id
     FROM forum_comments fc
     JOIN users u ON fc.user_id = u.id
     JOIN forum_posts fp ON fc.post_id = fp.id
     WHERE fc.id = ?`, [commentId]);
    return rows[0];
};
exports.createForumCommentService = createForumCommentService;
const toggleForumPostLikeService = async (postId, userId) => {
    const [existingLikeRows] = await db_1.default.execute('SELECT * FROM forum_likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
    const existingLike = existingLikeRows[0];
    let liked = false;
    if (existingLike) {
        // Unlike
        await db_1.default.execute('DELETE FROM forum_likes WHERE id = ?', [existingLike.id]);
        liked = false;
    }
    else {
        // Like
        await db_1.default.execute('INSERT INTO forum_likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
        liked = true;
    }
    const [likeCountRows] = await db_1.default.execute('SELECT COUNT(*) as count FROM forum_likes WHERE post_id = ?', [postId]);
    const likeCount = likeCountRows[0].count;
    const [postRows] = await db_1.default.execute('SELECT course_id FROM forum_posts WHERE id = ?', [postId]);
    const courseId = postRows[0]?.course_id;
    return { liked, likeCount, courseId };
};
exports.toggleForumPostLikeService = toggleForumPostLikeService;
