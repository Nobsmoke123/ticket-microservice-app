import { authenticated } from "../../../src/middlewares/authenticated";
import { getMockReq, getMockRes } from "@jest-mock/express";
// import { TokenUtils } from "../../src/utils";
import { NextFunction } from "express";
import { TokenUtils } from "../../../src/utils";

describe("Authenticated Middleware", () => {
  it("should throw Unauthorized error when the jwt is missing", () => {
    const mockedReq = getMockReq({
      session: {},
      user: "",
    });

    const { res: mockedRes } = getMockRes();

    const next: NextFunction = jest.fn();

    expect(() => authenticated(mockedReq, mockedRes, next)).toThrow(
      "Authentication token is missing"
    );
  });

  it("should throw unauthorised error when the jwt is invalid", () => {
    const mockedReq = getMockReq({
      session: {
        jwt: "invalid-token",
      },
    });

    const { res: mockedRes } = getMockRes();

    const next: NextFunction = jest.fn();

    jest.spyOn(TokenUtils, "verifyJwtToken").mockImplementation(() => {
      throw new Error("Invalid token");
    });

    expect(() => authenticated(mockedReq, mockedRes, next)).toThrow(
      "Invalid token"
    );
  });

  it("should call next when the jwt is valid", () => {
    const mockedReq = getMockReq({
      session: {
        jwt: "valid-token",
      },
      user: "",
    });

    const { res: mockedRes } = getMockRes();

    const next: NextFunction = jest.fn();

    jest.spyOn(TokenUtils, "verifyJwtToken").mockReturnValue({
      userId: "user-id",
      email: "test-email",
    });

    authenticated(mockedReq, mockedRes, next);
    expect(next).toHaveBeenCalled();
  });
});
