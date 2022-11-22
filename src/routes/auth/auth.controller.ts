import { Response, Request, NextFunction } from "express";
import { asyncHandler } from "@lib";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";

export const signin = asyncHandler(async (req, res) => {
  const dto: AuthDto = req.body;

  AuthService.signin(dto);

  res.json({ message: "signin" });
});

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const dto: AuthDto = req.body;

  AuthService.signup(dto);

  res.json({ message: "signup" });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  AuthService.logout();

  res.json({ message: "logout" });
});
