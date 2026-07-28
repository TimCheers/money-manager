import express from "express";

const app = express();

app.use(express.json());

let transactions = [];

app.post("/transactions", (req, res) => {
  const { amount, category } = req.body;
  const transaction = { id: Date.now(), amount, category };
  transactions.push(transaction);
  res.status(201).json(transaction);
});

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/about", (req, res) => {
  res.json({ status: "about page" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
