import { Response, Request, NextFunction } from "express";
import { asyncHandler } from "@lib";

export const signin = asyncHandler(async (req, res, next) => {
  res.json({ message: "signin" });
});

export const signup = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "signup" });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "logout" });
};
