import { Router } from "express";
import { ValidateZodSchema, AsyncWrapper } from "../middlewares";
import { signUpSchema } from "../schemas/auth";
import container from "../config/container";
import AuthController from "../controllers/auth.controller";

const router = Router();

const authController = container.resolve(AuthController);

router.post(
  "/api/users/signup",
  ValidateZodSchema(signUpSchema),
  AsyncWrapper(authController.signUp)
);

export { router as signUpRouter };
