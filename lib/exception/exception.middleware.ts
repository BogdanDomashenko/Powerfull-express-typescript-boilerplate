import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Exception } from "./Exception";

export const exceptionMiddleware = (
  error: any,
  req: Request,
  res: Response
) => {
  if (error instanceof Exception) {
    return res
      .status(error.statusCode)
      .json({ statusCode: error.statusCode, message: error.message });
  }

  console.error(error);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Unexpected error" });
};
