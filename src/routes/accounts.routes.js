import { Router } from "express";
import accountController from "../controllers/accounts.controller.js";

const router = Router();

router.get("/", accountController.getAllAccounts);
router.post("/", accountController.createAccount);
router.put("/:id", accountController.updateAccount);
router.delete("/:id", accountController.deleteAccount);

export default router;