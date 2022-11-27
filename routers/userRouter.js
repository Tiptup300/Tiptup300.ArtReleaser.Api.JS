import express from "express";
import authorize from "../middleware/authorize.js";
import userService from "../services/user/index.js";

var router = express.Router();
router.post("/", authorize("guest"), userService.postUser);
export default router;
