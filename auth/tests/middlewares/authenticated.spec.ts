import { authenticated } from "../../src/middlewares/authenticated";
import { getMockReq, getMockRes } from "@jest-mock/express";
// import { TokenUtils } from "../../src/utils";
import { NextFunction } from "express";

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
});
