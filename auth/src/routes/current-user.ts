import { Router, Request, Response } from "express";
import { authenticated } from "../middlewares/authenticated";

const router = Router();

router.get("/currentUser", authenticated, (req: Request, res: Response) => {
  res.status(200).json(JSON.parse(req.user));
});

export { router as currentUserRouter };
