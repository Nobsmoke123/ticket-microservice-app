import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateZodSchema =
  (schema: ZodSchema) =>
  <T>(req: Request<{}, T, T, T, {}>, _res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  };

export default validateZodSchema;
