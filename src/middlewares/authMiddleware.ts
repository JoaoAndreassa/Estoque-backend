import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { userId: number; email: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET não está definido no .env!");
    }

    const decoded = jwt.verify(token, jwtSecret) as { userId: number; email: string };
    req.user = decoded;
    next(); // **Garante que a requisição continua**
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

