import pool from '../../config/db';
import { CourseInput, MaterialInput, ReorderMaterialsInput } from './courses.validation';

export const createCourseService = async (courseData: CourseInput) => {
  const { title, description, level, mentor_id, is_published } = courseData;
  const [result] = await pool.execute(
    'INSERT INTO courses (title, description, level, mentor_id, is_published) VALUES (?, ?, ?, ?, ?)',
    [title, description, level, mentor_id, is_published]
  );
  const courseId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [courseId]);
  return (rows as any[])[0];
};

export const getAllCoursesService = async (level?: string, published?: string) => {
  let query = 'SELECT c.*, u.name as mentor_name FROM courses c LEFT JOIN users u ON c.mentor_id = u.id WHERE 1=1';
  const params: (string | boolean)[] = [];

  if (level) {
    query += ' AND c.level = ?';
    params.push(level);
  }
  if (published !== undefined) {
    query += ' AND c.is_published = ?';
    params.push(published === 'true');
  }

  const [rows] = await pool.execute(query, params);
  return rows;
};

export const getCourseByIdService = async (id: number) => {
  const [rows] = await pool.execute(
    'SELECT c.*, u.name as mentor_name FROM courses c LEFT JOIN users u ON c.mentor_id = u.id WHERE c.id = ?',
    [id]
  );
  return (rows as any[])[0];
};

export const updateCourseService = async (id: number, courseData: Partial<CourseInput>) => {
  const fields = Object.keys(courseData).map(key => `${key} = ?`).join(', ');
  const values = Object.values(courseData);

  if (fields.length === 0) {
    const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
    return (rows as any[])[0];
  }

  await pool.execute(`UPDATE courses SET ${fields} WHERE id = ?`, [...values, id]);
  const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
  return (rows as any[])[0];
};

export const deleteCourseService = async (id: number) => {
  await pool.execute('DELETE FROM courses WHERE id = ?', [id]);
};

export const getCourseMaterialsService = async (courseId: number) => {
  const [rows] = await pool.execute('SELECT * FROM materials WHERE course_id = ? ORDER BY order_index ASC', [courseId]);
  return rows;
};

export const createMaterialService = async (courseId: number, materialData: MaterialInput) => {
  const { title, content, type, order_index } = materialData;
  const [result] = await pool.execute(
    'INSERT INTO materials (course_id, title, content, type, order_index) VALUES (?, ?, ?, ?, ?)',
    [courseId, title, content, type, order_index]
  );
  const materialId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM materials WHERE id = ?', [materialId]);
  return (rows as any[])[0];
};

export const updateMaterialService = async (courseId: number, materialId: number, materialData: Partial<MaterialInput>) => {
  const fields = Object.keys(materialData).map(key => `${key} = ?`).join(', ');
  const values = Object.values(materialData);

  if (fields.length === 0) {
    const [rows] = await pool.execute('SELECT * FROM materials WHERE id = ?', [materialId]);
    return (rows as any[])[0];
  }

  await pool.execute(`UPDATE materials SET ${fields} WHERE id = ? AND course_id = ?`, [...values, materialId, courseId]);
  const [rows] = await pool.execute('SELECT * FROM materials WHERE id = ?', [materialId]);
  return (rows as any[])[0];
};

export const deleteMaterialService = async (courseId: number, materialId: number) => {
  await pool.execute('DELETE FROM materials WHERE id = ? AND course_id = ?', [materialId, courseId]);
};

export const reorderMaterialsService = async (courseId: number, reorderData: ReorderMaterialsInput) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    for (const item of reorderData) {
      await connection.execute(
        'UPDATE materials SET order_index = ? WHERE id = ? AND course_id = ?',
        [item.order_index, item.id, courseId]
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
