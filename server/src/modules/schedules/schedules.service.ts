import pool from '../../config/db';
import { CreateScheduleInput, UpdateScheduleInput } from './schedules.validation';

export const createScheduleService = async (scheduleData: CreateScheduleInput) => {
  const { course_id, title, start_at, end_at, meet_link } = scheduleData;
  const [result] = await pool.execute(
    'INSERT INTO schedules (course_id, title, start_at, end_at, meet_link) VALUES (?, ?, ?, ?, ?)',
    [course_id, title, start_at, end_at, meet_link]
  );
  const scheduleId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM schedules WHERE id = ?', [scheduleId]);
  return (rows as any[])[0];
};

export const getAllSchedulesService = async (courseId?: string) => {
  let query = 'SELECT s.*, c.title as course_title FROM schedules s JOIN courses c ON s.course_id = c.id WHERE 1=1';
  const params: (string | number)[] = [];

  if (courseId) {
    query += ' AND s.course_id = ?';
    params.push(Number(courseId));
  }

  query += ' ORDER BY s.start_at ASC';

  const [rows] = await pool.execute(query, params);
  return rows;
};

export const getScheduleByIdService = async (id: number) => {
  const [rows] = await pool.execute(
    `SELECT s.*, c.title as course_title
     FROM schedules s
     JOIN courses c ON s.course_id = c.id
     WHERE s.id = ?`,
    [id]
  );
  return (rows as any[])[0];
};

export const updateScheduleService = async (id: number, scheduleData: Partial<UpdateScheduleInput>) => {
  const fields = Object.keys(scheduleData).map(key => `${key} = ?`).join(', ');
  const values = Object.values(scheduleData);

  if (fields.length === 0) {
    const [rows] = await pool.execute('SELECT * FROM schedules WHERE id = ?', [id]);
    return (rows as any[])[0];
  }

  await pool.execute(`UPDATE schedules SET ${fields} WHERE id = ?`, [...values, id]);
  const [rows] = await pool.execute('SELECT * FROM schedules WHERE id = ?', [id]);
  return (rows as any[])[0];
};

export const deleteScheduleService = async (id: number) => {
  await pool.execute('DELETE FROM schedules WHERE id = ?', [id]);
};
