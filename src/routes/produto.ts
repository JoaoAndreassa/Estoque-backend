
import { produtoSchema } from '../validations/schemas';
import { validate } from '../middlewares/validade';
import { Router } from 'express';
import {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
} from '../controllers/produtoController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticate, criarProduto); // Criar produto (precisa estar autenticado)
router.get('/', listarProdutos); // Listar todos os produtos
router.get('/:id', buscarProdutoPorId); // Buscar produto por ID
router.post('/', authenticate, validate(produtoSchema), criarProduto);
router.put('/:id', authenticate, validate(produtoSchema), atualizarProduto);

export default router;
