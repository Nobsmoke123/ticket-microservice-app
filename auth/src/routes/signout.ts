import { Router, Request, Response } from "express";

const router = Router();

router.post("/signout", (req: Request, res: Response) => {
  req.session = null; // Clear the session
  res.status(200).json({
    message: "Signout route.",
  });
});

export { router as signOutRouter };
