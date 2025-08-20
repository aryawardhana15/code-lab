import pool from '../../config/db';
import { ProgressUpdateInput } from './enrollments.validation';

export const enrollInCourseService = async (studentId: number, courseId: number) => {
  // Check if already enrolled
  const [existingEnrollmentRows] = await pool.execute(
    'SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?',
    [studentId, courseId]
  );
  if ((existingEnrollmentRows as any[]).length > 0) {
    throw new Error('Student already enrolled in this course');
  }

  const [result] = await pool.execute(
    'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)',
    [studentId, courseId]
  );
  const enrollmentId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM enrollments WHERE id = ?', [enrollmentId]);
  return (rows as any[])[0];
};

export const getMyEnrollmentsService = async (studentId: number) => {
  const [rows] = await pool.execute(
    `SELECT e.*, c.title as course_title, c.description as course_description, c.level as course_level,
            u.name as mentor_name
     FROM enrollments e
     JOIN courses c ON e.course_id = c.id
     LEFT JOIN users u ON c.mentor_id = u.id
     WHERE e.student_id = ?`,
    [studentId]
  );
  return rows;
};

export const updateProgressService = async (
  studentId: number,
  enrollmentId: number,
  materialId: number,
  status: ProgressUpdateInput['status']
) => {
  // Verify enrollment belongs to the student
  const [enrollmentRows] = await pool.execute(
    'SELECT * FROM enrollments WHERE id = ? AND student_id = ?',
    [enrollmentId, studentId]
  );
  const enrollment = (enrollmentRows as any[])[0];

  if (!enrollment) {
    throw new Error('Enrollment not found or does not belong to this student');
  }

  // Check if material belongs to the enrolled course
  const [materialRows] = await pool.execute(
    'SELECT * FROM materials WHERE id = ? AND course_id = ?',
    [materialId, enrollment.course_id]
  );
  const material = (materialRows as any[])[0];

  if (!material) {
    throw new Error('Material not found or does not belong to the enrolled course');
  }

  // Update or insert progress
  const [result] = await pool.execute(
    `INSERT INTO progress (enrollment_id, material_id, status)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE status = ?, last_updated = CURRENT_TIMESTAMP`,
    [enrollmentId, materialId, status, status]
  );

  // Calculate and update progress_percent for the enrollment
  const [totalMaterialsRows] = await pool.execute(
    'SELECT COUNT(*) as total FROM materials WHERE course_id = ?',
    [enrollment.course_id]
  );
  const totalMaterials = (totalMaterialsRows as any[])[0].total;

  const [completedMaterialsRows] = await pool.execute(
    `SELECT COUNT(*) as completed FROM progress p
     JOIN materials m ON p.material_id = m.id
     WHERE p.enrollment_id = ? AND p.status = 'selesai' AND m.course_id = ?`,
    [enrollmentId, enrollment.course_id]
  );
  const completedMaterials = (completedMaterialsRows as any[])[0].completed;

  const progressPercent = totalMaterials > 0 ? Math.round((completedMaterials / totalMaterials) * 100) : 0;

  await pool.execute(
    'UPDATE enrollments SET progress_percent = ? WHERE id = ?',
    [progressPercent, enrollmentId]
  );

  // Check for badge achievement (e.g., 100% progress on first course)
  if (status === 'selesai' && progressPercent === 100) {
    // This is a placeholder. Actual badge logic would be more complex.
    // You might check if this is their first 100% course, then award a specific badge.
    // For now, just a console log.
    console.log(`Student ${studentId} completed course ${enrollment.course_id} with 100% progress!`);
    // Example: Award a "First Course Completed" badge
    // await awardBadgeService(studentId, 'FIRST_COURSE_COMPLETED');
  }

  const [updatedProgressRows] = await pool.execute(
    'SELECT * FROM progress WHERE enrollment_id = ? AND material_id = ?',
    [enrollmentId, materialId]
  );
  return (updatedProgressRows as any[])[0];
};
