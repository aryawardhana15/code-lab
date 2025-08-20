import pool from '../../config/db';
import { CreateChallengeInput, UpdateChallengeInput, SubmitChallengeInput, GradeSubmissionInput } from './challenges.validation';

export const createChallengeService = async (challengeData: CreateChallengeInput) => {
  const { course_id, title, description, points, start_at, end_at, is_active } = challengeData;
  const [result] = await pool.execute(
    'INSERT INTO challenges (course_id, title, description, points, start_at, end_at, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [course_id, title, description, points, start_at, end_at, is_active]
  );
  const challengeId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM challenges WHERE id = ?', [challengeId]);
  return (rows as any[])[0];
};

export const getAllChallengesService = async () => {
  const [rows] = await pool.execute('SELECT * FROM challenges ORDER BY created_at DESC');
  return rows;
};

export const getChallengeByIdService = async (id: number) => {
  const [rows] = await pool.execute('SELECT * FROM challenges WHERE id = ?', [id]);
  return (rows as any[])[0];
};

export const updateChallengeService = async (id: number, challengeData: Partial<UpdateChallengeInput>) => {
  const fields = Object.keys(challengeData).map(key => `${key} = ?`).join(', ');
  const values = Object.values(challengeData);

  if (fields.length === 0) {
    const [rows] = await pool.execute('SELECT * FROM challenges WHERE id = ?', [id]);
    return (rows as any[])[0];
  }

  await pool.execute(`UPDATE challenges SET ${fields} WHERE id = ?`, [...values, id]);
  const [rows] = await pool.execute('SELECT * FROM challenges WHERE id = ?', [id]);
  return (rows as any[])[0];
};

export const deleteChallengeService = async (id: number) => {
  await pool.execute('DELETE FROM challenges WHERE id = ?', [id]);
};

export const submitChallengeService = async (challengeId: number, studentId: number, submissionData: SubmitChallengeInput) => {
  const { repo_url, demo_url, note } = submissionData;

  // Check if challenge exists and is active
  const [challengeRows] = await pool.execute('SELECT * FROM challenges WHERE id = ? AND is_active = 1', [challengeId]);
  const challenge = (challengeRows as any[])[0];
  if (!challenge) {
    throw new Error('Challenge not found or not active');
  }

  // Check if student already submitted for this challenge
  const [existingSubmissionRows] = await pool.execute(
    'SELECT * FROM submissions WHERE challenge_id = ? AND student_id = ?',
    [challengeId, studentId]
  );
  if (Array.isArray(existingSubmissionRows) && existingSubmissionRows.length > 0) {
    throw new Error('You have already submitted for this challenge');
  }

  const [result] = await pool.execute(
    'INSERT INTO submissions (challenge_id, student_id, repo_url, demo_url, note) VALUES (?, ?, ?, ?, ?)',
    [challengeId, studentId, repo_url, demo_url, note]
  );
  const submissionId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM submissions WHERE id = ?', [submissionId]);
  return (rows as any[])[0];
};

export const getChallengeSubmissionsService = async (challengeId: number) => {
  const [rows] = await pool.execute(
    `SELECT s.*, u.name as student_name, u.email as student_email
     FROM submissions s
     JOIN users u ON s.student_id = u.id
     WHERE s.challenge_id = ?
     ORDER BY s.created_at DESC`,
    [challengeId]
  );
  return rows;
};

export const gradeSubmissionService = async (submissionId: number, gradeData: GradeSubmissionInput) => {
  const { score, feedback } = gradeData;

  const [submissionRows] = await pool.execute('SELECT * FROM submissions WHERE id = ?', [submissionId]);
  const submission = (submissionRows as any[])[0];

  if (!submission) {
    throw new Error('Submission not found');
  }

  await pool.execute(
    'UPDATE submissions SET score = ?, feedback = ? WHERE id = ?',
    [score, feedback, submissionId]
  );

  // Update leaderboard (if score is provided and it's a new score or higher)
  if (score !== null && score !== undefined) {
    const [userPointsRows] = await pool.execute(
      'SELECT total_points FROM leaderboard WHERE student_id = ?',
      [submission.student_id]
    );
    const currentPoints = (userPointsRows as any[])[0]?.total_points || 0;

    // Only update if new score is higher or if it's the first score
    if (score > currentPoints || userPointsRows.length === 0) {
      await pool.execute(
        `INSERT INTO leaderboard (student_id, total_points) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE total_points = ?`,
        [submission.student_id, score, score]
      );
    }
  }

  const [updatedSubmissionRows] = await pool.execute('SELECT * FROM submissions WHERE id = ?', [submissionId]);
  return (updatedSubmissionRows as any[])[0];
};
