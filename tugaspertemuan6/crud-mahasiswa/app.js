const express = require("express");
const mongoose = require("mongoose");

const app = express();

// koneksi MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/kampus");

// setting ejs
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: true }));

// routes
const mahasiswaRouter = require("./routes/mahasiswa");
app.use("/mahasiswa", mahasiswaRouter);

// redirect root
app.get("/", (req, res) => {
  res.redirect("/mahasiswa");
});

// run server
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
