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

    // // Set the JWT token in the response header
    // res.setHeader("Authorization", `Bearer ${jwt}`);
    // // Set the JWT token in the response body
    // res.setHeader("x-auth-token", jwt);
    // // Set the JWT token in the response cookie
    // res.cookie("jwt", jwt, {
    //   httpOnly: true,
    //   secure: true, // Set to true in production
    //   sameSite: "strict", // Prevent CSRF attacks
    //   maxAge: 60 * 60 * 1000, // 1 hour
    // });
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
    res.status(201).json(result);
    return;
  };
}
