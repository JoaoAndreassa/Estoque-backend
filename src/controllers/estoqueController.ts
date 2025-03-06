import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';

// Registrar entrada de estoque
export const entradaEstoque = async (req: Request, res: Response): Promise<void> => {
  try {
    const { produtoId, quantidade } = req.body;

    if (!produtoId || quantidade === undefined) {
      res.status(400).json({ message: 'ProdutoId e quantidade são obrigatórios.' });
      return;
    }

    const produto = await prisma.produto.findUnique({ where: { id: Number(produtoId) } });
    if (!produto) {
      res.status(404).json({ message: 'Produto não encontrado.' });
      return;
    }

    // Criar movimentação de entrada
    await prisma.estoque.create({
      data: { tipo: 'entrada', quantidade, produtoId: Number(produtoId) },
    });

    // Atualizar quantidade no produto
    await prisma.produto.update({
      where: { id: Number(produtoId) },
      data: { quantidade: produto.quantidade + quantidade },
    });

    res.status(201).json({ message: 'Entrada registrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar entrada:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Registrar saída de estoque
export const saidaEstoque = async (req: Request, res: Response): Promise<void> => {
  try {
    const { produtoId, quantidade } = req.body;

    if (!produtoId || quantidade === undefined) {
      res.status(400).json({ message: 'ProdutoId e quantidade são obrigatórios.' });
      return;
    }

    const produto = await prisma.produto.findUnique({ where: { id: Number(produtoId) } });
    if (!produto) {
      res.status(404).json({ message: 'Produto não encontrado.' });
      return;
    }

    if (produto.quantidade < quantidade) {
      res.status(400).json({ message: 'Estoque insuficiente.' });
      return;
    }

    // Criar movimentação de saída
    await prisma.estoque.create({
      data: { tipo: 'saida', quantidade, produtoId: Number(produtoId) },
    });

    // Atualizar quantidade no produto
    await prisma.produto.update({
      where: { id: Number(produtoId) },
      data: { quantidade: produto.quantidade - quantidade },
    });

    res.status(201).json({ message: 'Saída registrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar saída:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Listar movimentações do estoque
export const listarMovimentacoes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const movimentacoes = await prisma.estoque.findMany({
      include: { produto: { select: { name: true } } }, // Inclui nome do produto
    });
    res.json(movimentacoes);
  } catch (error) {
    console.error('Erro ao listar movimentações:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
