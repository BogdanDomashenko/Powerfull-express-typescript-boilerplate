//original module: https://github.com/ISNIT0/express-class-validator

import { transformAndValidate } from "class-transformer-validator";
import { Request, Response, NextFunction } from "express";

export function validate<T>(
  validationParam: 'body' | 'params' | 'query',
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
    const toValidate = req[validationParam];
    if (!toValidate) {
      if (errorHandler) {
        errorHandler({ type: "no-body" }, req, res, next);
      } else {
        res.status(400).json({
          error: true,
          message: validationParam + ": validation failed",
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
              message: validationParam + ": validation failed",
              errors: err.map(
                (errItem: any) => Object.values(errItem.constraints)[0]
              ),
            });
          }
        });
    }
  };
}
