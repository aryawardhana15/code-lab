"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeSubmissionService = exports.getChallengeSubmissionsService = exports.submitChallengeService = exports.deleteChallengeService = exports.updateChallengeService = exports.getChallengeByIdService = exports.getAllChallengesService = exports.createChallengeService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createChallengeService = async (challengeData) => {
    const { course_id, title, description, points, start_at, end_at, is_active } = challengeData;
    const [result] = await db_1.default.execute('INSERT INTO challenges (course_id, title, description, points, start_at, end_at, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)', [course_id, title, description, points, start_at, end_at, is_active]);
    const challengeId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM challenges WHERE id = ?', [challengeId]);
    return rows[0];
};
exports.createChallengeService = createChallengeService;
const getAllChallengesService = async () => {
    const [rows] = await db_1.default.execute('SELECT * FROM challenges ORDER BY created_at DESC');
    return rows;
};
exports.getAllChallengesService = getAllChallengesService;
const getChallengeByIdService = async (id) => {
    const [rows] = await db_1.default.execute('SELECT * FROM challenges WHERE id = ?', [id]);
    return rows[0];
};
exports.getChallengeByIdService = getChallengeByIdService;
const updateChallengeService = async (id, challengeData) => {
    const fields = Object.keys(challengeData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(challengeData);
    if (fields.length === 0) {
        const [rows] = await db_1.default.execute('SELECT * FROM challenges WHERE id = ?', [id]);
        return rows[0];
    }
    await db_1.default.execute(`UPDATE challenges SET ${fields} WHERE id = ?`, [...values, id]);
    const [rows] = await db_1.default.execute('SELECT * FROM challenges WHERE id = ?', [id]);
    return rows[0];
};
exports.updateChallengeService = updateChallengeService;
const deleteChallengeService = async (id) => {
    await db_1.default.execute('DELETE FROM challenges WHERE id = ?', [id]);
};
exports.deleteChallengeService = deleteChallengeService;
const submitChallengeService = async (challengeId, studentId, submissionData) => {
    const { repo_url, demo_url, note } = submissionData;
    // Check if challenge exists and is active
    const [challengeRows] = await db_1.default.execute('SELECT * FROM challenges WHERE id = ? AND is_active = 1', [challengeId]);
    const challenge = challengeRows[0];
    if (!challenge) {
        throw new Error('Challenge not found or not active');
    }
    // Check if student already submitted for this challenge
    const [existingSubmissionRows] = await db_1.default.execute('SELECT * FROM submissions WHERE challenge_id = ? AND student_id = ?', [challengeId, studentId]);
    if (Array.isArray(existingSubmissionRows) && existingSubmissionRows.length > 0) {
        throw new Error('You have already submitted for this challenge');
    }
    const [result] = await db_1.default.execute('INSERT INTO submissions (challenge_id, student_id, repo_url, demo_url, note) VALUES (?, ?, ?, ?, ?)', [challengeId, studentId, repo_url, demo_url, note]);
    const submissionId = result.insertId;
    const [rows] = await db_1.default.execute('SELECT * FROM submissions WHERE id = ?', [submissionId]);
    return rows[0];
};
exports.submitChallengeService = submitChallengeService;
const getChallengeSubmissionsService = async (challengeId) => {
    const [rows] = await db_1.default.execute(`SELECT s.*, u.name as student_name, u.email as student_email
     FROM submissions s
     JOIN users u ON s.student_id = u.id
     WHERE s.challenge_id = ?
     ORDER BY s.created_at DESC`, [challengeId]);
    return rows;
};
exports.getChallengeSubmissionsService = getChallengeSubmissionsService;
const gradeSubmissionService = async (submissionId, gradeData) => {
    const { score, feedback } = gradeData;
    const [submissionRows] = await db_1.default.execute('SELECT * FROM submissions WHERE id = ?', [submissionId]);
    const submission = submissionRows[0];
    if (!submission) {
        throw new Error('Submission not found');
    }
    await db_1.default.execute('UPDATE submissions SET score = ?, feedback = ? WHERE id = ?', [score, feedback, submissionId]);
    // Update leaderboard (if score is provided and it's a new score or higher)
    if (score !== null && score !== undefined) {
        const [userPointsRows] = await db_1.default.execute('SELECT total_points FROM leaderboard WHERE student_id = ?', [submission.student_id]);
        const currentPoints = userPointsRows[0]?.total_points || 0;
        // Only update if new score is higher or if it's the first score
        if (score > currentPoints || userPointsRows.length === 0) {
            await db_1.default.execute(`INSERT INTO leaderboard (student_id, total_points) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE total_points = ?`, [submission.student_id, score, score]);
        }
    }
    const [updatedSubmissionRows] = await db_1.default.execute('SELECT * FROM submissions WHERE id = ?', [submissionId]);
    return updatedSubmissionRows[0];
};
exports.gradeSubmissionService = gradeSubmissionService;
