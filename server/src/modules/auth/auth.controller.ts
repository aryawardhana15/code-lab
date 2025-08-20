import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, requestPasswordReset, resetUserPassword } from './auth.service';
import { UserInput, ForgotPasswordInput, ResetPasswordInput } from './auth.validation';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: UserInput = req.body;
    const user = await registerUser(userData);
    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email }: ForgotPasswordInput = req.body;
    await requestPasswordReset(email);
    res.status(200).json({ message: 'Password reset email sent if user exists.' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword }: ResetPasswordInput = req.body;
    await resetUserPassword(token, newPassword);
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (error) {
    next(error);
  }
};
