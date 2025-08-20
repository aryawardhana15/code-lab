import pool from '../../config/db';
import { io } from '../../server'; // Import the Socket.IO instance

export const createNotificationService = async (userId: number, type: string, message: string) => {
  const [result] = await pool.execute(
    'INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)',
    [userId, type, message]
  );
  const notificationId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM notifications WHERE id = ?', [notificationId]);
  const newNotification = (rows as any[])[0];

  // Emit notification via Socket.IO
  io.to(`user_${userId}`).emit('new_notification', newNotification);

  return newNotification;
};

export const getMyNotificationsService = async (userId: number) => {
  const [rows] = await pool.execute(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
};

export const markNotificationAsReadService = async (notificationId: number, userId: number) => {
  const [notificationRows] = await pool.execute(
    'SELECT * FROM notifications WHERE id = ? AND user_id = ?',
    [notificationId, userId]
  );
  const notification = (notificationRows as any[])[0];

  if (!notification) {
    throw new Error('Notification not found or does not belong to this user');
  }

  await pool.execute('UPDATE notifications SET is_read = 1 WHERE id = ?', [notificationId]);
  return { message: 'Notification marked as read' };
};
