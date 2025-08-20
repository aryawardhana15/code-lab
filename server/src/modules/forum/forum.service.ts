import pool from '../../config/db';
import { CreateForumPostInput, UpdateForumPostInput, CreateForumCommentInput } from './forum.validation';

export const createForumPostService = async (userId: number, postData: CreateForumPostInput) => {
  const { course_id, title, content } = postData;
  const [result] = await pool.execute(
    'INSERT INTO forum_posts (course_id, user_id, title, content) VALUES (?, ?, ?, ?)',
    [course_id, userId, title, content]
  );
  const postId = (result as any).insertId;
  const [rows] = await pool.execute(
    `SELECT fp.*, u.name as user_name, u.role as user_role
     FROM forum_posts fp
     JOIN users u ON fp.user_id = u.id
     WHERE fp.id = ?`,
    [postId]
  );
  return (rows as any[])[0];
};

export const getForumPostsByCourseService = async (courseId: number) => {
  const [rows] = await pool.execute(
    `SELECT fp.*, u.name as user_name, u.role as user_role,
            (SELECT COUNT(*) FROM forum_comments fc WHERE fc.post_id = fp.id) as comment_count,
            (SELECT COUNT(*) FROM forum_likes fl WHERE fl.post_id = fp.id) as like_count
     FROM forum_posts fp
     JOIN users u ON fp.user_id = u.id
     WHERE fp.course_id = ?
     ORDER BY fp.created_at DESC`,
    [courseId]
  );
  return rows;
};

export const getForumPostByIdService = async (postId: number) => {
  const [rows] = await pool.execute(
    `SELECT fp.*, u.name as user_name, u.role as user_role,
            (SELECT COUNT(*) FROM forum_likes fl WHERE fl.post_id = fp.id) as like_count
     FROM forum_posts fp
     JOIN users u ON fp.user_id = u.id
     WHERE fp.id = ?`,
    [postId]
  );
  const post = (rows as any[])[0];

  if (post) {
    const [commentsRows] = await pool.execute(
      `SELECT fc.*, u.name as user_name, u.role as user_role
       FROM forum_comments fc
       JOIN users u ON fc.user_id = u.id
       WHERE fc.post_id = ?
       ORDER BY fc.created_at ASC`,
      [postId]
    );
    post.comments = commentsRows;
  }
  return post;
};

export const updateForumPostService = async (
  postId: number,
  userId: number,
  userRole: string,
  postData: Partial<UpdateForumPostInput>
) => {
  const [postRows] = await pool.execute('SELECT * FROM forum_posts WHERE id = ?', [postId]);
  const post = (postRows as any[])[0];

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

  await pool.execute(`UPDATE forum_posts SET ${fields} WHERE id = ?`, [...values, postId]);
  const [updatedRows] = await pool.execute(
    `SELECT fp.*, u.name as user_name, u.role as user_role
     FROM forum_posts fp
     JOIN users u ON fp.user_id = u.id
     WHERE fp.id = ?`,
    [postId]
  );
  return (updatedRows as any[])[0];
};

export const deleteForumPostService = async (postId: number, userId: number, userRole: string) => {
  const [postRows] = await pool.execute('SELECT * FROM forum_posts WHERE id = ?', [postId]);
  const post = (postRows as any[])[0];

  if (!post) {
    throw new Error('Forum post not found');
  }

  // Only allow owner or admin/mentor to delete
  if (post.user_id !== userId && !['admin', 'mentor'].includes(userRole)) {
    throw new Error('Unauthorized to delete this post');
  }

  await pool.execute('DELETE FROM forum_posts WHERE id = ?', [postId]);
};

export const createForumCommentService = async (
  postId: number,
  userId: number,
  commentData: CreateForumCommentInput
) => {
  const { content } = commentData;
  const [result] = await pool.execute(
    'INSERT INTO forum_comments (post_id, user_id, content) VALUES (?, ?, ?)',
    [postId, userId, content]
  );
  const commentId = (result as any).insertId;
  const [rows] = await pool.execute(
    `SELECT fc.*, u.name as user_name, u.role as user_role, fp.course_id
     FROM forum_comments fc
     JOIN users u ON fc.user_id = u.id
     JOIN forum_posts fp ON fc.post_id = fp.id
     WHERE fc.id = ?`,
    [commentId]
  );
  return (rows as any[])[0];
};

export const toggleForumPostLikeService = async (postId: number, userId: number) => {
  const [existingLikeRows] = await pool.execute(
    'SELECT * FROM forum_likes WHERE post_id = ? AND user_id = ?',
    [postId, userId]
  );
  const existingLike = (existingLikeRows as any[])[0];
  let liked = false;

  if (existingLike) {
    // Unlike
    await pool.execute('DELETE FROM forum_likes WHERE id = ?', [existingLike.id]);
    liked = false;
  } else {
    // Like
    await pool.execute('INSERT INTO forum_likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
    liked = true;
  }

  const [likeCountRows] = await pool.execute(
    'SELECT COUNT(*) as count FROM forum_likes WHERE post_id = ?',
    [postId]
  );
  const likeCount = (likeCountRows as any[])[0].count;

  const [postRows] = await pool.execute('SELECT course_id FROM forum_posts WHERE id = ?', [postId]);
  const courseId = (postRows as any[])[0]?.course_id;

  return { liked, likeCount, courseId };
};
