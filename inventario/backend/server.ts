import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

let db: any;

async function initDb() {
  console.log("[DB] Inicializando SQLite...");
  db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      stock INTEGER
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      quantity INTEGER,
      date TEXT
    );
  `);

  console.log("[DB] Tablas listas.");
}

// Endpoints
app.get("/api/products", async (req, res) => {
  const products = await db.all("SELECT * FROM products");
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const { name, price, stock } = req.body;
  const result = await db.run(
    "INSERT INTO products (name, price, stock) VALUES (?,?,?)",
    [name, price, stock]
  );
  res.json({ id: result.lastID, name, price, stock });
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  await db.run("UPDATE products SET name=?, price=?, stock=? WHERE id=?", [
    name,
    price,
    stock,
    id,
  ]);
  res.json({ id, name, price, stock });
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  await db.run("DELETE FROM products WHERE id=?", [id]);
  res.json({ message: "Producto eliminado" });
});

app.get("/api/sales", async (req, res) => {
  const sales = await db.all(`
    SELECT 
      s.id, 
      s.product_id, 
      p.name AS product_name, 
      p.price AS product_price,
      s.quantity, 
      s.date
    FROM sales s
    LEFT JOIN products p ON s.product_id = p.id
  `);
  res.json(sales);
});

app.post("/api/sales", async (req, res) => {
  const { product_id, quantity, date } = req.body;
  await db.run(
    "INSERT INTO sales (product_id, quantity, date) VALUES (?,?,?)",
    [product_id, quantity, date]
  );
  await db.run("UPDATE products SET stock = stock - ? WHERE id=?", [
    quantity,
    product_id,
  ]);
  res.json({ message: "Venta registrada" });
});

app.put("/api/sales/:id", async (req, res) => {
  try {
    const { product_id, quantity, date } = req.body;
    const { id } = req.params;
    await db.run(
      "UPDATE sales SET product_id = ?, quantity = ?, date = ? WHERE id = ?",
      [product_id, quantity, date, id]
    );
    res.json({ id, product_id, quantity, date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar la venta" });
  }
});

app.get("/api/reports/daily", async (req, res) => {
  const report = await db.all(
    `SELECT date, SUM(quantity * p.price) as total 
     FROM sales s 
     JOIN products p ON s.product_id = p.id 
     GROUP BY date 
     ORDER BY date DESC`
  );
  res.json(report);
});

// Bootstrap
(async () => {
  try {
    await initDb();
    app.listen(3000, () => {
      console.log("El API está en http://localhost:3000");
    });
  } catch (err) {
    console.error("[FATAL] Error al iniciar backend:", err);
  }
})();
