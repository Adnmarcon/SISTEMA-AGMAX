const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
  res.send("Olá, mundo! O back-end do sistema Agmax está no ar!");
});

// Rota para listar clientes (exemplo com dados fictícios)
app.get("/clientes", (req, res) => {
  const clientes = [
    { id: 1, nome: "Cliente A", cnpj: "00.000.000/0001-00" },
    { id: 2, nome: "Cliente B", cnpj: "11.111.111/0001-11" },
  ];
  res.json(clientes);
});

// Rota para criar novo cliente (apenas simulando por enquanto)
app.post("/clientes", (req, res) => {
  const { nome, cnpj } = req.body;
  const novoCliente = { id: Date.now(), nome, cnpj };
  res.status(201).json(novoCliente);
});

// Inicia o servidor (local)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
