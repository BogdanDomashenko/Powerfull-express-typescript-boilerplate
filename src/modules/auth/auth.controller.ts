import { Response, Request, NextFunction } from "express";
import { asyncHandler } from "@lib";
import { AuthSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

export const signin = asyncHandler(async (req, res) => {
  const dto: AuthSchema = req.body;

  AuthService.signin(dto);

  res.json({ message: "signin" });
});

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const dto: AuthSchema = req.body;

  AuthService.signup(dto);

  res.json({ message: "signup" });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  AuthService.logout();

  res.json({ message: "logout" });
});
