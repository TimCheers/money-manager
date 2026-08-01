import { Router } from "express";
import transactionsController from "../controllers/transactions.controller.js";
import requireJWT from "../middleware/auth.middleware.js";

const router = Router();
//router.use(requireJWT);

router.get("/", transactionsController.getAllTransactions);
router.post("/", transactionsController.createTransaction);
router.put("/:id", transactionsController.updateTransaction);
router.delete("/:id", transactionsController.deleteTransaction);

export default router;