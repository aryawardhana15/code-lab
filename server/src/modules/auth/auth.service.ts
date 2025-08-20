import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { UserInput } from './auth.validation';
import pool from '../../config/db'; // Import the MySQL connection pool
import { sendEmail } from '../../utils/email'; // Assuming an email utility

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
    [name, email, password_hash, 'student'] // Default role as 'student'
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

export const requestPasswordReset = async (email: string) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = (rows as any[])[0];

  if (!user) {
    // For security, do not reveal if the user exists or not
    return;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now

  await pool.execute(
    'UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?',
    [resetToken, resetPasswordExpires, user.id]
  );

  const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetURL} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      message,
    });
  } catch (error) {
    await pool.execute(
      'UPDATE users SET reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?',
      [user.id]
    );
    throw new Error('There was an error sending the email. Try again later.');
  }
};

export const resetUserPassword = async (token: string, newPassword: string) => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > ?',
    [token, new Date()]
  );
  const user = (rows as any[])[0];

  if (!user) {
    throw new Error('Password reset token is invalid or has expired.');
  }

  const password_hash = await bcrypt.hash(newPassword, 10);

  await pool.execute(
    'UPDATE users SET password_hash = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?',
    [password_hash, user.id]
  );
};
