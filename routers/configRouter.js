import express from "express";
import authorize from "../middleware/authorize.js";
import configService from "../services/config/index.js";

const router = express.Router();
router.post("/init", authorize("admin"), configService.initConfig);

export default router;
