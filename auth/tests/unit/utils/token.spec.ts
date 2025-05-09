import jwt from "jsonwebtoken";
import { createJwtToken, verifyJwtToken } from "../../../src/utils/token";

describe("Token Utility Functions", () => {
  jest.spyOn(jwt, "sign").mockImplementation(() => "mockedToken");
  jest.spyOn(jwt, "verify").mockImplementation(() => ({
    email: "test@email.com",
    userId: "1",
  }));

  process.env.JWT_SECRET_KEY = "testSecretKey";

  it("should create a JWT token", () => {
    const payload = { email: "test@gmail.com", userId: "123" };

    const token = createJwtToken(payload);
    expect(token).toBe("mockedToken");
    expect(jwt.sign).toHaveBeenCalledWith(payload, "testSecretKey", {
      expiresIn: "1h",
    });
  });

  it("should verify a JWT token", () => {
    const token = "mockedToken";
    const decoded = verifyJwtToken(token);

    expect(decoded).toMatchObject({
      email: "test@email.com",
      userId: "1",
    });
    expect(jwt.verify).toHaveBeenCalledWith(token, "testSecretKey");
  });
});
