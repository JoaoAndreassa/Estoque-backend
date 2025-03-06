import { z } from 'zod';

// Validação para Criar um Usuário
export const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Validação para Criar um Produto
export const produtoSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
  imagem: z.string().url("URL da imagem inválida").optional(),
  valor: z.number().positive("Valor deve ser um número positivo"),
  quantidade: z.number().int().nonnegative("Quantidade deve ser um número inteiro positivo"),
});

// Validação para Movimentações de Estoque
export const estoqueSchema = z.object({
  produtoId: z.number().int().positive("ProdutoId deve ser um número válido"),
  quantidade: z.number().int().positive("Quantidade deve ser um número positivo"),
});
