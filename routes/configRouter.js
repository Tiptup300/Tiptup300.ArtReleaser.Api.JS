import express from "express";
import authorize from "../middleware/authorizeMiddleware.js";
import { initConfig } from "./configService.js.js";

const router = express.Router();
router.post("/init", authorize("admin"), initConfig);

export default router;
