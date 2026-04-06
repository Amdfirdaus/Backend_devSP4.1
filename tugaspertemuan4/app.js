const express = require("express");
const db = require("./db");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// 🔹 SETUP MULTER (UPLOAD)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 🔹 TAMPIL DATA
app.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    res.render("index", { data: result });
  });
});

// 🔹 FORM TAMBAH
app.get("/add", (req, res) => {
  res.render("add");
});

// 🔹 SIMPAN DATA + GAMBAR
app.post("/save", upload.single("gambar"), (req, res) => {
  const { nama_produk, harga, stok } = req.body;
  const gambar = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO products (nama_produk, harga, stok, gambar) VALUES (?, ?, ?, ?)",
    [nama_produk, harga, stok, gambar],
    () => {
      res.redirect("/");
    },
  );
});

// 🔹 EDIT
app.get("/edit/:id", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id=?",
    [req.params.id],
    (err, result) => {
      res.render("edit", { data: result[0] });
    },
  );
});

// 🔹 UPDATE
app.post("/update/:id", upload.single("gambar"), (req, res) => {
  const { nama_produk, harga, stok } = req.body;
  let gambar = req.file ? req.file.filename : req.body.old_gambar;

  db.query(
    "UPDATE products SET nama_produk=?, harga=?, stok=?, gambar=? WHERE id=?",
    [nama_produk, harga, stok, gambar, req.params.id],
    () => {
      res.redirect("/");
    },
  );
});

// 🔹 DELETE
app.get("/delete/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], () => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});
