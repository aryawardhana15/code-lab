import pool from '../../config/db';
import { CreateProjectInput, UpdateProjectInput } from './projects.validation';

export const createProjectService = async (studentId: number, projectData: CreateProjectInput) => {
  const { title, screenshot_url, demo_url, description } = projectData;
  const [result] = await pool.execute(
    'INSERT INTO projects (student_id, title, screenshot_url, demo_url, description) VALUES (?, ?, ?, ?, ?)',
    [studentId, title, screenshot_url, demo_url, description]
  );
  const projectId = (result as any).insertId;
  const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
  return (rows as any[])[0];
};

export const getAllProjectsService = async (published?: string) => {
  let query = `
    SELECT p.*, u.name as student_name, u.email as student_email
    FROM projects p
    JOIN users u ON p.student_id = u.id
    WHERE 1=1
  `;
  const params: (string | boolean)[] = [];

  if (published !== undefined) {
    query += ' AND p.is_published = ?';
    params.push(published === 'true');
  }

  query += ' ORDER BY p.created_at DESC';

  const [rows] = await pool.execute(query, params);
  return rows;
};

export const getProjectByIdService = async (id: number) => {
  const [rows] = await pool.execute(
    `SELECT p.*, u.name as student_name, u.email as student_email
     FROM projects p
     JOIN users u ON p.student_id = u.id
     WHERE p.id = ?`,
    [id]
  );
  return (rows as any[])[0];
};

export const updateProjectService = async (
  projectId: number,
  userId: number,
  userRole: string,
  projectData: Partial<UpdateProjectInput>
) => {
  const [projectRows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
  const project = (projectRows as any[])[0];

  if (!project) {
    throw new Error('Project not found');
  }

  // Only allow owner or admin/mentor to update
  if (project.student_id !== userId && !['admin', 'mentor'].includes(userRole)) {
    throw new Error('Unauthorized to update this project');
  }

  const fields = Object.keys(projectData).map(key => `${key} = ?`).join(', ');
  const values = Object.values(projectData);

  if (fields.length === 0) {
    return project;
  }

  await pool.execute(`UPDATE projects SET ${fields} WHERE id = ?`, [...values, projectId]);
  const [updatedRows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
  return (updatedRows as any[])[0];
};

export const deleteProjectService = async (projectId: number, userId: number, userRole: string) => {
  const [projectRows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
  const project = (projectRows as any[])[0];

  if (!project) {
    throw new Error('Project not found');
  }

  // Only allow owner or admin/mentor to delete
  if (project.student_id !== userId && !['admin', 'mentor'].includes(userRole)) {
    throw new Error('Unauthorized to delete this project');
  }

  await pool.execute('DELETE FROM projects WHERE id = ?', [projectId]);
};

export const approveProjectService = async (projectId: number, isPublished: boolean) => {
  await pool.execute('UPDATE projects SET is_published = ? WHERE id = ?', [isPublished, projectId]);
  const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [projectId]);
  return (rows as any[])[0];
};
