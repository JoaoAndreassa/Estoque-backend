import { Router } from 'express';
import { entradaEstoque, saidaEstoque, listarMovimentacoes } from '../controllers/estoqueController';
import { authenticate } from '../middlewares/authMiddleware';
import { estoqueSchema } from '../validations/schemas';
import { validate } from '../middlewares/validade';
import prisma from "../prisma/prismaClient";
import { promises } from 'dns';
const router = Router();

router.post('/entrada', authenticate, validate(estoqueSchema), entradaEstoque);
router.post('/saida', authenticate, validate(estoqueSchema), saidaEstoque);
router.get('/', listarMovimentacoes); // Listar movimentações

router.patch("/:id", async (req, res): Promise<void>   => {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;
  
      const movimentacaoExistente = await prisma.estoque.findUnique({
        where: { id: Number(id) },
      });
  
      if (!movimentacaoExistente) {
        res.status(404).json({ message: "Movimentação não encontrada!" }); return
      }
  
      
      const movimentacaoAtualizada = await prisma.estoque.update({
        where: { id: Number(id) },
        data: { quantidade: Number(quantidade) },
      });
  
      res.json(movimentacaoAtualizada);
    } catch (error) {
      console.error("Erro ao editar movimentação:", error);
      res.status(500).json({ message: "Erro ao editar movimentação" });
    }
  });
  

export default router;
