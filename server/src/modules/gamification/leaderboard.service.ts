import pool from '../../config/db';

interface LeaderboardEntry {
  id: number;
  student_id: number;
  total_points: number;
  // Add other fields as per your 'leaderboard' table schema
}

interface User { // Assuming 'student' refers to the 'users' table
  id: number;
  name: string;
  avatar_url: string;
  // Add other fields as per your 'users' table schema
}

export const getLeaderboardData = async () => {
  const [rows] = await pool.execute(`
    SELECT
      l.id,
      l.student_id,
      l.total_points,
      u.name AS student_name,
      u.avatar_url AS student_avatar_url
    FROM
      leaderboard l
    JOIN
      users u ON l.student_id = u.id
    ORDER BY
      l.total_points DESC
    LIMIT 10
  `);

  const leaderboard = rows as (LeaderboardEntry & { student_name: string; student_avatar_url: string })[];

  return leaderboard.map((entry, index) => ({
    rank: index + 1,
    userId: entry.student_id,
    username: entry.student_name,
    avatarUrl: entry.student_avatar_url,
    totalPoints: entry.total_points,
  }));
};
