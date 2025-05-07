export { default as Logger } from "./logger";
export { default as connectDB } from "./database";
import { createJwtToken, verifyJwtToken } from "./token";

export const TokenUtils = {
  createJwtToken,
  verifyJwtToken,
};
