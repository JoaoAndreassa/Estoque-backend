import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/user';
import produtoRoutes from './routes/produto'; 
import estoqueRoutes from './routes/estoque';
dotenv.config();

const app = express();

app.use(express.json()); // Middleware para interpretar JSON

// 🔹 Confirme que essas duas linhas estão aqui!
app.use('/api/users', usersRouter);
app.use('/api/produtos', produtoRoutes); // 🔥 Certifique-se de que essa linha existe!
app.use('/api/estoque', estoqueRoutes);

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('✅ Rota /api/produtos foi adicionada ao Express!'); // 🔥 Adicione esse log para confirmar!
});
