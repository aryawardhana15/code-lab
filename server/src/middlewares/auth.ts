import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define roles based on your database schema for the 'users' table
type Role = 'user' | 'admin' | 'mentor'; // Adjust as per your actual roles

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: Role;
  };
}

export const authRequired = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: Role };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const roleRequired = (roles: Role[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({ message: 'Access denied. User not authenticated.' });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: `Access denied. Requires one of roles: ${roles.join(', ')}` });
  }

  next();
};
