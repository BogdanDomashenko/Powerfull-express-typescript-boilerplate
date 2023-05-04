import { Router } from 'express';
import { HandlerFunction, asyncHandler } from '@lib';
import { ValidationParam, validate } from '@lib';
import { ZodSchema, z } from 'zod';

type CustomRouter = () => Record<Method, MethodFunction> & { initialize: () => Router };

type Schema = Partial<Record<ValidationParam, ZodSchema>>;

interface MethodOptions {
  schema?: Schema;
  middleware?: [HandlerFunction];
  handler: HandlerFunction;
}

type Method =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';
const methods: Method[] = [
  'all',
  'get',
  'post',
  'put',
  'delete',
  'patch',
  'options',
  'head',
];

type MethodFunction = (path: string, options: MethodOptions) => Router;

export const createRouter: CustomRouter = () => {
  const router = Router();

  const routes = methods.reduce((aac, method) => {
    const methodHandler: MethodFunction = (
      path,
      { schema, middleware = [], handler }
    ) => {
      const validationMiddleware = schema
        ? (Object.keys(schema) as ValidationParam[]).map(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
            (item: ValidationParam) => validate(item, schema[item])
          )
        : [];
      return router[method](
        path,
        ...validationMiddleware,
        ...middleware,
        asyncHandler(handler)
      );
    };

    return { ...aac, [method]: methodHandler };
  }, {});

  const initialize = () => {
    return router;
  }

  return {...routes, initialize } as Record<Method, MethodFunction> & { initialize: () => Router };
};
