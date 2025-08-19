import pool from '../../config/db';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  // Add other fields as per your 'badges' table schema
}

interface UserBadge {
  id: number;
  user_id: number;
  badge_id: number;
  assigned_at: Date;
  // Add other fields as per your 'user_badges' table schema
}

export const getAllBadges = async (): Promise<Badge[]> => {
  const [rows] = await pool.execute('SELECT * FROM badges');
  return rows as Badge[];
};

export const assignBadgeToUser = async (userId: number, badgeId: number): Promise<UserBadge> => {
  const [result] = await pool.execute(
    'INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)',
    [userId, badgeId]
  );
  const userBadgeId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM user_badges WHERE id = ?', [userBadgeId]);
  return (rows as UserBadge[])[0];
};

export const revokeBadgeFromUser = async (userId: number, badgeId: number): Promise<void> => {
  await pool.execute('DELETE FROM user_badges WHERE user_id = ? AND badge_id = ?', [userId, badgeId]);
};
