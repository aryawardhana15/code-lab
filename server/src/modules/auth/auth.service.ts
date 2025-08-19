import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInput } from './auth.validation';
import pool from '../../config/db'; // Import the MySQL connection pool

export const registerUser = async (userData: UserInput) => {
  const { name, email, password } = userData;

  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  const existingUser = (rows as any[])[0];

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const password_hash = await bcrypt.hash(password, 10);

  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, password_hash, 'user'] // Assuming 'user' as default role
  );

  const userId = (result as any).insertId;
  const [newUserRows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
  const newUser = (newUserRows as any[])[0];

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = (rows as any[])[0];

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return { user, token };
};
