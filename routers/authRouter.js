import express from "express";
import authorize from "../middleware/authorize.js";
import authService from "../services/auth/index.js";

const router = express.Router();
router.get("/token", authorize("guest", "user"), authService.getToken);
router.post("/token", authService.postToken);
router.post("/login", authService.postLogin);

export default router;
