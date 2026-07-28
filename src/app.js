import express from "express";
import transactionsRoutes from "./routes/transactions.routes.js";
import miscRoutes from "./routes/misc.routes.js";

const app = express();

app.use(express.json());
app.use("/transactions", transactionsRoutes);
app.use("/", miscRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

export default app;