import { Request, Response } from "express";
import { LoginInput } from "../schemas/auth";
import AuthService from "../service/auth-service";

export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  currentUser = async (_req: Request, _res: Response) => {};

  signIn = async (
    req: Request<{}, {}, LoginInput["body"], {}, {}>,
    res: Response
  ) => {
    const { email, password } = req.body;
    res.status(200).json({ email, password });
    return;
  };

  signOut = async (_req: Request, _res: Response) => {};

  signUp = async (_req: Request, _res: Response) => {};
}
