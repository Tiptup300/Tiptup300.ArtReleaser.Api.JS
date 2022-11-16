import express from "express";
import Authorize from "../tools/authorize.js";
import { postUser } from "./userService.js";

var router = express.Router();
router.post("/", Authorize("guest"), postUser);
export default router;
