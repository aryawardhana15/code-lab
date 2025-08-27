import { app } from './app';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import pool from './config/db'; // Import the MySQL connection pool

dotenv.config({ path: './.env' });

console.log(`DEBUG: process.env.PORT is ${process.env.PORT}`);
const PORT = process.env.PORT || 8080;
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('join_forum', (courseId) => {
    socket.join(`forum_${courseId}`);
    console.log(`User ${socket.id} joined forum for course ${courseId}`);
  });

  socket.on('leave_forum', (courseId) => {
    socket.leave(`forum_${courseId}`);
    console.log(`User ${socket.id} left forum for course ${courseId}`);
  });

  socket.on('new_forum_post', (post) => {
    io.to(`forum_${post.courseId}`).emit('forum_post_created', post);
  });

  socket.on('new_forum_comment', (comment) => {
    io.to(`forum_${comment.courseId}`).emit('forum_comment_created', comment);
  });

  socket.on('forum_post_like_toggle', (data) => {
    io.to(`forum_${data.courseId}`).emit('forum_post_liked', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

const startServer = async () => {
  try {
    // Test database connection
    await pool.getConnection();
    console.log('Database connected successfully!');
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

console.log(`Express server is attempting to start on port ${PORT}`);

startServer();

export { io };
