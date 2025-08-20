"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.requestPasswordReset = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const db_1 = __importDefault(require("../../config/db")); // Import the MySQL connection pool
const email_1 = require("../../utils/email"); // Assuming an email utility
const registerUser = async (userData) => {
    const { name, email, password } = userData;
    const [rows] = await db_1.default.execute('SELECT * FROM users WHERE email = ?', [email]);
    const existingUser = rows[0];
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    const password_hash = await bcryptjs_1.default.hash(password, 10);
    const [result] = await db_1.default.execute('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', [name, email, password_hash, 'student'] // Default role as 'student'
    );
    const userId = result.insertId;
    const [newUserRows] = await db_1.default.execute('SELECT * FROM users WHERE id = ?', [userId]);
    const newUser = newUserRows[0];
    return newUser;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const [rows] = await db_1.default.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};
exports.loginUser = loginUser;
const requestPasswordReset = async (email) => {
    const [rows] = await db_1.default.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
        // For security, do not reveal if the user exists or not
        return;
    }
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
    await db_1.default.execute('UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?', [resetToken, resetPasswordExpires, user.id]);
    const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetURL} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;
    try {
        await (0, email_1.sendEmail)({
            email: user.email,
            subject: 'Password Reset Token',
            message,
        });
    }
    catch (error) {
        await db_1.default.execute('UPDATE users SET reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [user.id]);
        throw new Error('There was an error sending the email. Try again later.');
    }
};
exports.requestPasswordReset = requestPasswordReset;
const resetUserPassword = async (token, newPassword) => {
    const [rows] = await db_1.default.execute('SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > ?', [token, new Date()]);
    const user = rows[0];
    if (!user) {
        throw new Error('Password reset token is invalid or has expired.');
    }
    const password_hash = await bcryptjs_1.default.hash(newPassword, 10);
    await db_1.default.execute('UPDATE users SET password_hash = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [password_hash, user.id]);
};
exports.resetUserPassword = resetUserPassword;
