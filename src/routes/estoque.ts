import { Router } from 'express';
import { entradaEstoque, saidaEstoque, listarMovimentacoes } from '../controllers/estoqueController';
import { authenticate } from '../middlewares/authMiddleware';
import { estoqueSchema } from '../validations/schemas';
import { validate } from '../middlewares/validade';

const router = Router();

router.post('/entrada', authenticate, validate(estoqueSchema), entradaEstoque);
router.post('/saida', authenticate, validate(estoqueSchema), saidaEstoque);
router.get('/', listarMovimentacoes); // Listar movimentações

export default router;
