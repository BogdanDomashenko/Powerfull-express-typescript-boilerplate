import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export type ValidationParam = 'body' | 'params' | 'query';

export const validate = (
  validationParam: ValidationParam,
  schema: ZodSchema
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const toValidate = req[validationParam];

    if (!toValidate) {
      return res.status(400).json({
        error: true,
        message: validationParam + ': validation failed',
      });
    }

    try {
      schema.parse(toValidate);
      next();
    } catch (err: any) {
      const errors: Record<string, string> = {};

      for (const item of err.errors) {
        errors[
          item.path.reduce(
            (aac: string, curr: string) => (aac ? ' ,' : '' + aac + curr),
            ''
          )
        ] = item.message;
      }

      return res.status(400).json({
        error: true,
        message: validationParam + ': validation failed',
        errors,
      });
    }
  };
};
