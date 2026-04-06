const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "firdaus",
  database: "db_toko_bangunan",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = db;
