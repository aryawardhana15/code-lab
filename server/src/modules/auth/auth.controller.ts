import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from './auth.service';
import { UserInput } from './auth.validation';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: UserInput = req.body;
    const user = await registerUser(userData);
    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email, role: user.role } });
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
