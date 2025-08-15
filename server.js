const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// serve static assets from /public
app.use(express.static(path.join(__dirname, 'public')));

// load products from JSON
function loadProducts() {
  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json')));
  return products;
}

// API: all products
app.get('/api/products', (_req, res) => res.json(loadProducts()));

// API: single product
app.get('/api/products/:id', (req, res) => {
  const item = loadProducts().find(p => p.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// API: checkout stub (replace with Stripe later)
app.post('/api/checkout', (req, res) => {
  // do server-side validation here
  res.json({ ok: true, orderId: 'TS-' + Math.random().toString(36).slice(2,8) });
});

// API: contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact:', name, email, message);
  res.json({ ok: true });
});

// health check
app.get('/healthz', (_req, res) => res.send('ok'));

app.listen(PORT, () => console.log(`TimeSaver running on port ${PORT}`));
