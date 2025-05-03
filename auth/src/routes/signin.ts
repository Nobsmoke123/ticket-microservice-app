import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { ValidateZodSchema, AsyncWrapper } from "../middlewares";
import { loginSchema } from "../schemas/auth";

const router = Router();

const authController = new AuthController();

router.post(
  "/signin",
  ValidateZodSchema(loginSchema),
  AsyncWrapper(authController.signIn)
);

export { router as signInRouter };
