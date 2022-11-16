import express from "express";
import Authorize from "../tools/authorize.js";
import { getToken, postLogin, postToken } from "./authService.js";

const router = express.Router();
router.get("/token", Authorize("guest", "user"), getToken);
router.post("/token", postToken);
router.post("/login", postLogin);

export default router;
