"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db")); // Import the MySQL connection pool
dotenv_1.default.config({ path: './.env' });
const PORT = process.env.PORT || 5000;
const httpServer = (0, http_1.createServer)(app_1.app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
exports.io = io;
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
        await db_1.default.getConnection();
        console.log('Database connected successfully!');
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};
startServer();
