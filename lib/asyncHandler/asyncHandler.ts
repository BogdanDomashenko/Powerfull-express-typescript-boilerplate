import { NextFunction, Request, Response } from "express";

export type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export const asyncHandler =
  (callback: HandlerFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const promise = Promise.resolve(callback(req, res, next)).catch(next);
    const result = await promise;

    if (result) {
      if (!res.headersSent) {
        res.json(result);
      } else {
        throw new Error("You can send response only once");
      }
    }

    return promise;
  };
