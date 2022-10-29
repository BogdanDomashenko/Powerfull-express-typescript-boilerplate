//original module: https://github.com/ISNIT0/express-class-validator

import { transformAndValidate } from "class-transformer-validator";
import { Request, Response, NextFunction } from "express";

const isProd = process.env.NODE_ENV === "production";

export function validateBody<T>(
  entity: T,
  whitelist = true,
  errorHandler?: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
) {
  return function ExpressClassValidate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const toValidate = req.body;
    if (!toValidate) {
      if (errorHandler) {
        errorHandler({ type: "no-body" }, req, res, next);
      } else {
        res.status(400).json({
          error: true,
          message: "Validation failed",
        });
      }
    } else {
      transformAndValidate(entity as any, toValidate, {
        validator: { whitelist },
      })
        .then((transformed) => {
          req.body = transformed;
          next();
        })
        .catch((err) => {
          if (errorHandler) {
            errorHandler(err, req, res, next);
          } else {
            res.status(400).json({
              statusCode: 400,
              message: "Validation failed",
              errors: err.map(
                (errItem: any) => Object.values(errItem.constraints)[0]
              ),
            });
          }
        });
    }
  };
}
