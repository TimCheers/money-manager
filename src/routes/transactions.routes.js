import { Router } from "express";
import transactionsController from "../controllers/transactions.controller.js";

const router = Router();

router.get("/", transactionsController.getAllTransactions);
router.post("/", transactionsController.createTransaction);

export default router;