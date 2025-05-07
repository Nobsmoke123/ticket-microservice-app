import { Request, Response, NextFunction } from "express";
import { TokenUtils } from "../utils";
import { UnauthorizedError } from "../errors";

/**
 * Middleware to check if the user is authenticated.
 * It verifies the JWT token and sets the user information in the request object.
 * If the token is invalid or missing, it throws an Unauthorized Error.
 */

export const authenticated = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.session?.jwt;

  if (!token) {
    throw new UnauthorizedError("Authentication token is missing");
  }

  try {
    const decoded = TokenUtils.verifyJwtToken(token);
    req.user = JSON.stringify(decoded);
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
};
