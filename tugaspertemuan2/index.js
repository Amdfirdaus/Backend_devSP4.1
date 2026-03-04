const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
];
app.get("/", (req, res) => {
  res.send("Selamat datang di API Produk!");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Produk tidak ditemukan" });
  }
  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Nama dan harga produk harus diisi" });
  }
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: "Produk tidak ditemukan" });
  }
  const { name: newName, price: newPrice } = req.body;
  product.name = newName ?? product.name;
  product.price = newPrice ?? product.price;
  res.json({ message: "Produk berhasil diperbarui", product });
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Produk tidak ditemukan" });
  }
  products.splice(productIndex, 1);
  res.json({ message: "Produk berhasil dihapus" });
});

app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});
