import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for the given user ID.
 * @param {string} userId - The ID of the user.
 * @returns {string} - The generated JWT token.
 */

interface ITokenPayload {
  email: string;
  userId: string;
}

export const createJwtToken = (payload: ITokenPayload) => {
  const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "1h", // Token expiration time
  });
  return token;
};

export const verifyJwtToken = (token: string) => {
  const secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";
  const decoded = jwt.verify(token, secretKey) as ITokenPayload;
  return decoded;
};
