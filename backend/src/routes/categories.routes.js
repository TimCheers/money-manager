import { Router } from "express";
import requireJWT from "../middleware/auth.middleware.js";
import categoryController from "../controllers/categories.controller.js";

const router = Router();
router.use(requireJWT);

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;