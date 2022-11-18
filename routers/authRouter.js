import express from "express";
import { getToken, postLogin, postToken } from "../auth/authService.js";
import authorize from "../middleware/authorizeMiddleware.js";

const router = express.Router();
router.get("/token", authorize("guest", "user"), getToken);
router.post("/token", postToken);
router.post("/login", postLogin);

export default router;
