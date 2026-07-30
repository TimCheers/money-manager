import { Router } from "express";
import miscController from "../controllers/misc.controller.js";

const router = Router();

router.get("/", miscController.mainPage);
router.get("/ping", miscController.pingPage);
router.get("/about", miscController.aboutPage);

export default router;