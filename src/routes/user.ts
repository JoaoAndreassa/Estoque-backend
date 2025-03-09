import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middlewares/authMiddleware';
import { hashPassword, comparePassword } from '../utils/auth';
import { PrismaClient } from '@prisma/client';
import { userSchema } from '../validations/schemas';
import { validate } from '../middlewares/validade';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Nome, email e senha são obrigatórios!' });
    return;
  }

  try {
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Email já cadastrado!' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.usuario.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ message: 'Usuário não encontrado!' });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Senha inválida!' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET não está definida no arquivo .env!");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    next(error);
  }
});



router.get('/profile', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Usuário não autenticado.' });
      return;
    }

    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado.' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

export default router;


