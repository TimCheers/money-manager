import { Router } from "express";
import authMiddleware  from "../middleware/auth.middleware.js";
import tagController from "../controllers/tag.controller.js";

const router = Router();
router.use(authMiddleware.requireJWT);

router.get("/", tagController.getAllTags);
router.post("/", tagController.createTag);
router.put("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

export default router;