import { Router } from "express";
import { currentUserRouter } from "./current-user";
import { signUpRouter } from "./signup";
import { signInRouter } from "./signin";
import { signOutRouter } from "./signout";
import { notFoundRouter } from "./404route";

const router = Router();

router.use("/api/users/", currentUserRouter);
router.use("/api/users/", signUpRouter);
router.use("/api/users/", signInRouter);
router.use("/api/users/", signOutRouter);
router.use("/*splat", notFoundRouter);

export { router as authRouter };
