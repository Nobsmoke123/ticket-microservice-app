import { Router, Request, Response } from "express";

const router = Router();

router.all("*", (_req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found.",
    code: 404,
  });
});

export { router as notFoundRouter };
