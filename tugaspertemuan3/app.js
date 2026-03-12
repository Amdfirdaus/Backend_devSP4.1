const express = require("express");
const db = require("./db");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// =================
// TAMPIL PRODUK
// =================

app.get("/", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.render("index", {
      products: result,
    });
  });
});

// =================
// HALAMAN TAMBAH
// =================

app.get("/tambah", (req, res) => {
  res.render("tambah");
});

// =================
// PROSES TAMBAH
// =================

app.post("/tambah", (req, res) => {
  const { nama_produk, harga, stok } = req.body;

  const sql = `
    INSERT INTO products (nama_produk,harga,stok)
    VALUES (?,?,?)
    `;

  db.query(sql, [nama_produk, harga, stok], (err) => {
    if (err) throw err;

    res.redirect("/");
  });
});

// =================
// HALAMAN EDIT
// =================

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.render("edit", {
      product: result[0],
    });
  });
});

// =================
// PROSES EDIT
// =================

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { nama_produk, harga, stok } = req.body;

  const sql = `
    UPDATE products
    SET nama_produk=?, harga=?, stok=?
    WHERE id=?
    `;

  db.query(sql, [nama_produk, harga, stok, id], (err) => {
    if (err) throw err;

    res.redirect("/");
  });
});

// =================
// HAPUS PRODUK
// =================

app.get("/hapus/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) throw err;

    res.redirect("/");
  });
});

// =================
// SERVER
// =================

app.listen(3000, () => {
  console.log("Server running di http://localhost:3000");
});
