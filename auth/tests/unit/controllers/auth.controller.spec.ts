import { getMockReq, getMockRes } from "@jest-mock/express";
import AuthController from "../../../src/controllers/auth.controller";
import AuthService from "../../../src/service/auth-service";
import { TokenUtils } from "../../../src/utils";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;
  authService = new AuthService();
  authController = new AuthController(authService);

  const mockValidRequest = getMockReq({
    body: {
      email: "donald@gmail.com",
      password: "test-user",
      fullname: "Donald Akobundu",
    },
  });

  const mockedToken = "test-token";

  const { res: mockResponse } = getMockRes();

  const mockUser = {
    id: "1",
    email: "donald@gmail.com",
    fullname: "Donald Akobundu",
    createdAt: new Date(),
    updatedAt: new Date(),
    token: mockedToken,
  };

  jest.spyOn(authService, "signUpUser").mockResolvedValue(mockUser);
  jest.spyOn(authService, "signInUser").mockResolvedValue(mockUser);
  jest.spyOn(TokenUtils, "createJwtToken").mockReturnValue(mockedToken);

  it("SignUp - should register a user when given valid email and password", async () => {
    await authController.signUp(mockValidRequest, mockResponse);
    expect.assertions(5);
    expect(authService.signUpUser).toHaveBeenCalledWith(
      mockValidRequest.body.fullname,
      mockValidRequest.body.email,
      mockValidRequest.body.password
    );
    expect(TokenUtils.createJwtToken).toHaveBeenCalledWith({
      userId: mockUser.id,
      email: mockUser.email,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    expect(mockValidRequest.session).toEqual({ jwt: mockedToken });
  });

  it("SignIn - should sign in a user when given valid email and password", async () => {
    const mockSignInRequest = getMockReq({
      body: {
        email: "donald@gmail.com",
        password: "Blackhat007",
      },
    });

    const { res: mockSignInResponse } = getMockRes();

    await authController.signIn(mockSignInRequest, mockSignInResponse);

    expect.assertions(5);
    expect(authService.signInUser).toHaveBeenCalledWith(
      mockSignInRequest.body.email,
      mockSignInRequest.body.password
    );
    expect(TokenUtils.createJwtToken).toHaveBeenCalledWith({
      userId: mockUser.id,
      email: mockUser.email,
    });
    expect(mockSignInResponse.status).toHaveBeenCalledWith(200);
    expect(mockSignInResponse.json).toHaveBeenCalledWith(mockUser);
    expect(mockSignInRequest.session).toEqual({ jwt: mockedToken });
  });
});
