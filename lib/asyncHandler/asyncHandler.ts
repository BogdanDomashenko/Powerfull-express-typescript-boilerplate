import { NextFunction, Request, Response } from 'express';

export type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export const asyncHandler =
  (callback: HandlerFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(callback(req, res, next)).catch(next);
  };
