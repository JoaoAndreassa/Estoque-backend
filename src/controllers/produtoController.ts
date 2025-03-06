import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { promises } from 'dns';

// Criar um novo produto
export const criarProduto = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, descricao, imagem, valor, quantidade } = req.body;
  
      if (!name || !descricao || !valor || quantidade === undefined) {
        res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
        return;
      }
  
      const novoProduto = await prisma.produto.create({
        data: { name, descricao, imagem, valor, quantidade },
      });
  
      res.status(201).json(novoProduto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };

// Listar todos os produtos
export const listarProdutos = async (_req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Buscar um único produto por ID
export const buscarProdutoPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    if (!produto) {
      res.status(404).json({ message: 'Produto não encontrado.' });
      return 
    }

    res.json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Atualizar um produto
export const atualizarProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, descricao, imagem, valor, quantidade } = req.body;

    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: { name, descricao, imagem, valor, quantidade },
    });

    res.json(produtoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Deletar um produto
export const deletarProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.produto.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Produto deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

