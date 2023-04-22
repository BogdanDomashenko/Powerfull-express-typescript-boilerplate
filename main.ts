import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import 'module-alias/register';

import indexRouter from './src/modules';
import { exceptionMiddleware } from './lib';

const mode = process.env.NODE_ENV || 'production';

if (mode === 'production') {
  dotenv.config();
} else {
  dotenv.config({ path: `.${mode}.env` });
}

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
      },
    ],
  },
  apis: ['./dist/src/modules/*/*.route.js'],
};

const specs = swaggerJsDoc(options);

const app: Express = express();
const port = process.env.PORT || 3001;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(logger('dev'));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  exceptionMiddleware(err, req, res);
});

app.listen(port, () => {
  console.clear();
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`[server]: Mode: ${mode}`);
});
