import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import authenticate from "./middleware/authenticate.js";
import authRouter from "./routers/authRouter.js";
import configRouter from "./routers/configRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authenticate);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/config", configRouter);

export default app;
