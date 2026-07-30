import { Router } from "express";
import requireJWT from "../middleware/auth.middleware.js";
import accountController from "../controllers/accounts.controller.js";

const router = Router();
router.use(requireJWT);

router.get("/", accountController.getAllAccounts);
router.post("/", accountController.createAccount);
router.put("/:id", accountController.updateAccount);
router.delete("/:id", accountController.deleteAccount);

export default router;