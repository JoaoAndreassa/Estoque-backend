import express from 'express';
import cors from "cors"; 
import dotenv from 'dotenv';
import usersRouter from './routes/user';
import produtoRoutes from './routes/produto'; 
import estoqueRoutes from './routes/estoque';
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json()); 


app.use('/api/users', usersRouter);
app.use('/api/produtos', produtoRoutes);
app.use('/api/estoque', estoqueRoutes);

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
