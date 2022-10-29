import express from "express";
import { validateBody } from "@lib";
import { logout, signin, signup } from "./auth.controller";
import { AuthDto } from "./dto/auth.dto";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(AuthDto), signup);
authRouter.post("/signin", validateBody(AuthDto), signin);
authRouter.get("/logout", logout);

export default authRouter;
