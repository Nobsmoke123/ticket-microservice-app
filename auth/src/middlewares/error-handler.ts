import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Logger } from "../utils";
import AppError from "../errors/app-error";
import { ZodError } from "zod";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  Logger.error(err.message, err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json(err.serializeError());
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: err.issues.map((issue) => issue.message),
      code: 400,
    });
    return;
  }

  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      error: err,
      code: 500,
    });
    return;
  }

  res.status(500).json({
    error: "Something went wrong!",
    code: 500,
  });

  return;
};

export default errorHandler;
