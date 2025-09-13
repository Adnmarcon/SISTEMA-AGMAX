const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Nosso "banco de dados" temporário em memória
let stock = [
  { id: 1, name: 'Produto A', quantity: 100, price: 10.50 },
  { id: 2, name: 'Produto B', quantity: 250, price: 5.75 },
  { id: 3, name: 'Produto C', quantity: 50, price: 25.00 }
];

// Rota inicial para verificar o status do servidor
app.get('/', (req, res) => {
  res.send('Olá, mundo! O back-end do sistema Agmax está no ar!');
});

// Rota para listar todos os produtos em estoque
app.get('/stock', (req, res) => {
  res.status(200).json(stock);
});

// Rota para adicionar um novo produto ao estoque
app.post('/stock', (req, res) => {
  const newProduct = req.body;
  if (!newProduct.name || newProduct.quantity == null || newProduct.price == null) {
    return res.status(400).json({ error: 'Dados inválidos. Os campos "name", "quantity" e "price" são obrigatórios.' });
  }
  const newId = stock.length > 0 ? Math.max(...stock.map(p => p.id)) + 1 : 1;
  const productToAdd = { id: newId, ...newProduct };
  stock.push(productToAdd);
  res.status(201).json(productToAdd);
});

// Rota para atualizar a quantidade de um produto
app.put('/stock/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const product = stock.find(p => p.id == id);

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }

  if (quantity == null || typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ error: 'Quantidade inválida. A quantidade deve ser um número maior ou igual a 0.' });
  }

  product.quantity = quantity;
  res.status(200).json(product);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
