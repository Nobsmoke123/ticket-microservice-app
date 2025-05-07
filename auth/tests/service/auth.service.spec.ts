import AuthService from "../../src/service/auth-service";
import User from "../../src/models/user";

describe("AuthService", () => {
  let authService: AuthService;
  authService = new AuthService();

  const mockedUser = {
    _id: "1",
    email: "donald@gmail.com",
    fullname: "Donald Akobundu",
    createdAt: new Date(),
    updatedAt: new Date(),
    comparePassword: jest.fn().mockResolvedValue(true),
  };

  it("SignInUser - should sign in a user when given valid email and password", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(mockedUser);
    const email = "donald@gmail.com";
    const password = "test-user";
    const result = await authService.signInUser(email, password);

    expect(result).toHaveProperty("token");
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(mockedUser.comparePassword).toHaveBeenCalledWith(password);
    expect(result).toMatchObject({
      id: mockedUser._id.toString(),
      fullname: mockedUser.fullname,
      email: mockedUser.email,
      createdAt: mockedUser.createdAt,
      updatedAt: mockedUser.updatedAt,
      token: expect.any(String),
    });
  });

  it("SignInUser - should throw UnauthorizedError when user not found", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);
    const email = "test@gmail.com";
    const password = "test123";

    await expect(authService.signInUser(email, password)).rejects.toThrow(
      "Invalid email or password."
    );

    // expect(
    //   async () => await authService.signInUser(email, password)
    // ).rejects.toThrow("Invalid email or password.");
    expect(User.findOne).toHaveBeenCalledWith({ email });
  });

  it("SignInUser - should throw UnauthorizedError when password is incorrect", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(mockedUser);
    mockedUser.comparePassword.mockResolvedValue(false);

    const email = "donald@gmail.com";
    const password = "wrong-password";

    await expect(authService.signInUser(email, password)).rejects.toThrow(
      "Invalid credentials."
    );
    expect(mockedUser.comparePassword).toHaveBeenCalledWith(password);
    expect(User.findOne).toHaveBeenCalledWith({ email });
  });
});
