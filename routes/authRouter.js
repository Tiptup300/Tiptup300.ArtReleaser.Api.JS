import express from "express";
import authorize from "../middleware/authorizeMiddleware.js";
import { getToken, postLogin, postToken } from "./authService.js.js";

const router = express.Router();
router.get("/token", authorize("guest", "user"), getToken);
router.post("/token", postToken);
router.post("/login", postLogin);

export default router;
