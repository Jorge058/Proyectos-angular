import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

let db: any;
async () => {
  db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });
};

//Aqui pongo los endpoints para las consultas

app.get("/api/products", async (req, res) => {
  const products = await db.all("SELECT * FROM products");
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const { name, price, stock } = req.body;
  const result = await db.run(
    "INSERT INTO products (name, price ,stock) VALUES (?,?,?)",
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

//Registrar cuando algo se vende
app.post("/api/sales", async (req, res) => {
  const { product_id, quantity, date } = req.body;
  await db.run(
    "INSERT INTO sales (product_id, quantity, date) VALUES ()?,?,?",
    [product_id, quantity, date]
  );
  //Entonces descontamos del inventario el que se vendio
  await db.run("UPDATE products SET stock - ? WHERE id=?", [
    quantity,
    product_id,
  ]);
  res.json({ message: "Venta registrada" });
});

app.get("/api/reports/daily", async (req, res) => {
  const report = await db.all(
    `SELECT date, SUM(quantity * p.price) as total 
     FROM sales s 
     JOIN products p ON s.product_id = p.id 
     GROUP BY date 
     ORDER BY date DESC
     `);
    res.json(report);
});

app.listen(3000, ()=>{
    console.log('El api es http://localhost:3000')
})
