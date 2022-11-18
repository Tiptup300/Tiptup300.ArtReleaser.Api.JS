import express from "express";
import authorize from "../middleware/authorizeMiddleware.js";
import { postUser } from "../user/userService.js";

var router = express.Router();
router.post("/", authorize("guest"), postUser);
export default router;
