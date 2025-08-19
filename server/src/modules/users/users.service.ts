import pool from '../../config/db';

interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  // Add other fields as per your 'users' table schema
}

export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.execute('SELECT * FROM users');
  return rows as User[];
};

export const getUserById = async (id: number): Promise<User | null> => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return (rows as User[])[0] || null;
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = Object.values(data);

  await pool.execute(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);

  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return (rows as User[])[0];
};

export const deleteUser = async (id: number): Promise<void> => {
  await pool.execute('DELETE FROM users WHERE id = ?', [id]);
};
