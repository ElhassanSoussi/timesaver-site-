const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load products function
function loadProducts() {
  const data = fs.readFileSync(path.join(__dirname, 'products.json'));
  return JSON.parse(data);
}

// API: all products
app.get('/api/products', (_req, res) => {
  res.json(loadProducts());
});

// API: single product
app.get('/api/products/:id', (req, res) => {
  const item = loadProducts().find(p => p.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// API: checkout
app.post('/api/checkout', (req, res) => {
  res.json({ 
    ok: true, 
    orderId: 'TS-' + Math.random().toString(36).slice(2, 8)
  });
});

// API: contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form:', { name, email, message });
  res.json({ ok: true });
});

// Health check
app.get('/healthz', (_req, res) => res.send('ok'));

app.listen(PORT, () => 
  console.log(⁠ TimeSaver running on port ${PORT} ⁠));
