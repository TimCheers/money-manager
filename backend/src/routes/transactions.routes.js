import { Router } from "express";
import transactionsController from "../controllers/transactions.controller.js";
import authMiddleware  from "../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware.requireJWT);

router.get("/", transactionsController.getAllTransactions);
router.get("/admin/all", authMiddleware.requireAdmin, transactionsController.getAllTransactionsAdmin);
router.post("/", transactionsController.createTransaction);
router.put("/:id", transactionsController.updateTransaction);
router.delete("/:id", transactionsController.deleteTransaction);

export default router;