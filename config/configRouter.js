import express from "express";
import Authorize from "../tools/authorize.js";
import { initConfig } from "./configService.js";

const router = express.Router();
router.post("/init", Authorize("admin"), initConfig);

export default router;
