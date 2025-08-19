import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'hafiz1180',
  database: process.env.DB_NAME || 'coding_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
