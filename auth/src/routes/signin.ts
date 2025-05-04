import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { ValidateZodSchema, AsyncWrapper } from "../middlewares";
import { loginSchema } from "../schemas/auth";
import container from "../config/container";

const router = Router();

const authController = container.resolve(AuthController);

router.post(
  "/signin",
  ValidateZodSchema(loginSchema),
  AsyncWrapper(authController.signIn)
);

export { router as signInRouter };
