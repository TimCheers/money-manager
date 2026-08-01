import express from "express";
import cors from "cors";
import transactionsRoutes from "./routes/transactions.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import accountRoutes from "./routes/accounts.routes.js";
import authRoutes from "./routes/auth.routes.js";
import miscRoutes from "./routes/misc.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/transactions", transactionsRoutes);
app.use("/categories", categoryRoutes);
app.use("/accounts", accountRoutes);
app.use("/", miscRoutes);
app.use("/auth", authRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

export default app;