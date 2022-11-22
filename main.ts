import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import "module-alias/register";

import indexRouter from "./src/routes";
import { exceptionMiddleware } from "./lib";

const mode = process.env.NODE_ENV || "production";

if (mode === "production") {
  dotenv.config();
} else {
  dotenv.config({ path: `.${mode}.env` });
}

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  exceptionMiddleware(err, req, res);
});

app.listen(port, () => {
  console.clear();
  console.log(`[server]: Server is running at https://localhost:${port}`);
  console.log(`[server]: Mode: ${mode}`);
});
