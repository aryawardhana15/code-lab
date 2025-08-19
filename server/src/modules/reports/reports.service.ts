import { Parser } from 'json2csv';
import pool from '../../config/db';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: Date;
}

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: Date;
}

interface Enrollment {
  id: number;
  student_id: number;
  course_id: number;
  created_at: Date;
}

export const generateUsersReport = async (): Promise<string> => {
  const [rows] = await pool.execute('SELECT id, name, email, role, created_at FROM users');
  const users = rows as User[];

  const fields = ['id', 'name', 'email', 'role', 'created_at'];
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(users);
};

export const generateCoursesReport = async (): Promise<string> => {
  const [rows] = await pool.execute('SELECT id, title, description, price, created_at FROM courses');
  const courses = rows as Course[];

  const fields = ['id', 'title', 'description', 'price', 'created_at'];
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(courses);
};

export const generateEnrollmentsReport = async (): Promise<string> => {
  const [rows] = await pool.execute('SELECT id, student_id, course_id, created_at FROM enrollments');
  const enrollments = rows as Enrollment[];

  const fields = ['id', 'student_id', 'course_id', 'created_at'];
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(enrollments);
};
