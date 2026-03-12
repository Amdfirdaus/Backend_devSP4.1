const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "firdaus",
  database: "db_toko_bangunan",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = connection;
