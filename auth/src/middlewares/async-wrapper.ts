import { Request, Response, NextFunction } from "express";

const AsyncWrapper =
  <Params = {}, ResBody = {}, ReqBody = any, ReqQuery = any, T = any>(
    fn: (
      req: Request<Params, ResBody, ReqBody, ReqQuery, {}>,
      res: Response,
      next: NextFunction
    ) => Promise<T>
  ) =>
  async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await fn(req, res, next);
      return result;
    } catch (error) {
      next(error);
    }
  };

export default AsyncWrapper;
