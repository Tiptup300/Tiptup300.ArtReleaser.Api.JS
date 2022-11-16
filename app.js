import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import Authenticate from "./tools/authenticate.js";

import authRouter from "./auth/authRouter.js";
import configRouter from "./config/configRouter.js";
import userRouter from "./user/userRouter.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(Authenticate);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/config", configRouter);

export default app;
