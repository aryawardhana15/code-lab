"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.resetPassword = exports.forgotPassword = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const register = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await (0, auth_service_1.registerUser)(userData);
        res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        await (0, auth_service_1.requestPasswordReset)(email);
        res.status(200).json({ message: 'Password reset email sent if user exists.' });
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        await (0, auth_service_1.resetUserPassword)(token, newPassword);
        res.status(200).json({ message: 'Password has been reset successfully.' });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await (0, auth_service_1.loginUser)(email, password);
        res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role }, token });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
