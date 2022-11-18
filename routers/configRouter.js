import express from "express";
import { initConfig } from "../config/configService.js";
import authorize from "../middleware/authorizeMiddleware.js";

const router = express.Router();
router.post("/init", authorize("admin"), initConfig);

export default router;
