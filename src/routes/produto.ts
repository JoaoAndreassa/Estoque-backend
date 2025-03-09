import express, { Request, Response } from "express";
import multer from "multer";
import fs from "fs"; 
import path from "path";
import prisma from "../prisma/prismaClient";


const router = express.Router();


// const uploadDir = path.join(__dirname, "../../uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


const storage = multer.memoryStorage(); 
const upload = multer({ storage });


router.post("/", async (req, res) => {
  try {
    const { name, descricao, valor, quantidade, imagem } = req.body; 

    const produto = await prisma.produto.create({
      data: { name, descricao, valor: parseFloat(valor), quantidade: parseInt(quantidade), imagem },
    });

    res.status(201).json(produto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
});

router.patch("/:id/reduzir", async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    if (!produto) {
       res.status(404).json({ message: "Produto não encontrado!" });return
    }

    if (produto.quantidade < quantidade) {
       res.status(400).json({ message: "Estoque insuficiente!" });return
    }

    
    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: { quantidade: produto.quantidade - quantidade },
    });

    
    await prisma.estoque.create({
      data: {
        produtoId: Number(id),
        quantidade,
        tipo: "saida",
        createdAt: new Date(),
      },
    });

    res.json(produtoAtualizado);
  } catch (error) {
    console.error("Erro ao reduzir quantidade do produto:", error);
    res.status(500).json({ message: "Erro ao reduzir quantidade do produto" });
  }
});


router.patch("/:id/adicionar", async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    
    if (!quantidade || quantidade <= 0) {
      res.status(400).json({ message: "Quantidade inválida." }); return
    }

    
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    if (!produto) {
       res.status(404).json({ message: "Produto não encontrado." });return
    }

    
    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        quantidade: produto.quantidade + quantidade,
      },
    });

    
    await prisma.estoque.create({
      data: {
        tipo: "entrada",
        quantidade,
        produtoId: Number(id),
      },
    });

    res.json(produtoAtualizado);
  } catch (error) {
    console.error("Erro ao adicionar ao estoque:", error);
    res.status(500).json({ message: "Erro ao adicionar ao estoque." });
  }
});



router.get("/", async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, descricao, valor, quantidade } = req.body;

    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: { name, descricao, valor: parseFloat(valor), quantidade: parseInt(quantidade) },
    });

    res.json(produtoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
});


router.delete("/:id", async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const produtoId = Number(id);

    
    if (!produtoId || isNaN(produtoId)) {
       res.status(400).json({ message: "ID inválido" });return
    }

    
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produtoExistente) {
       res.status(404).json({ message: "Produto não encontrado" });return
    }

   
    await prisma.estoque.deleteMany({
      where: { produtoId },
    });

    
    await prisma.produto.delete({
      where: { id: produtoId },
    });

     res.json({ message: `Produto ${id} excluído com sucesso!` });return
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
     res.status(500).json({ message: "Erro ao excluir produto", error: error });return
  }
}); 


// router.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

export default router;

