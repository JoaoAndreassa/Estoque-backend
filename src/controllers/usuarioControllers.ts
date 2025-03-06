import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient'; // Certifique-se que este caminho está correto

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Verificar se o usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    // Criar usuário no banco
    const novoUsuario = await prisma.usuario.create({
      data: {
        name,
        email,
        password, // **IMPORTANTE:** Depois vamos criptografar a senha com bcrypt
      },
    });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
