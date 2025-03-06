import pool from "../config/database"; // Ajuste o caminho se necessário

async function testDB() {
  try {
    const [rows] = await pool.query("SHOW TABLES");
    console.log("Tabelas no banco de dados:", rows);
  } catch (error) {
    console.error("Erro ao consultar o banco:", error);
  }
}

testDB();