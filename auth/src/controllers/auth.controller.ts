import { Request, Response } from "express";

export default class AuthController {
  currentUser = async (_req: Request, _res: Response) => {};

  signIn = async (_req: Request, _res: Response) => {};

  signOut = async (_req: Request, _res: Response) => {};

  signUp = async (_req: Request, _res: Response) => {};
}
