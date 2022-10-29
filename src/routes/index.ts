import express from "express";
import authRouter from "./auth/auth.route";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);

export default indexRouter;
