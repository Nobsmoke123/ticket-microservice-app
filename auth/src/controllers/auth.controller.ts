import { Request, Response } from "express";
import { LoginInput, SignUpInput } from "../schemas/auth";
import AuthService from "../service/auth-service";
import { injectable } from "tsyringe";
import { createJwtToken } from "../utils/token";

@injectable()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  currentUser = async (_req: Request, _res: Response) => {};

  signIn = async (
    req: Request<{}, {}, LoginInput["body"], {}, {}>,
    res: Response
  ) => {
    const { email, password } = req.body;
    const result = await this.authService.signInUser(email, password);
    const jwt = createJwtToken({
      userId: result.id.toString(),
      email: result.email,
    });

    // Set the JWT token in the session
    req.session = req.session ? { ...req.session, jwt } : { jwt };

    res.status(200).json(result);
    return;
  };

  signOut = async (_req: Request, _res: Response) => {};

  signUp = async (
    req: Request<{}, {}, SignUpInput["body"], {}, {}>,
    res: Response
  ) => {
    const { fullname, email, password } = req.body;
    const result = await this.authService.signUpUser(fullname, email, password);
    const jwt = createJwtToken({
      userId: result.id.toString(),
      email: result.email,
    });

    // Set the JWT token in the session
    req.session = req.session ? { ...req.session, jwt } : { jwt };
    res.status(201).json(result);
    return;
  };
}
