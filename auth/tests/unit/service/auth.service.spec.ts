import AuthService from "../../../src/service/auth-service";
import User, { IUser } from "../../../src/models/user";
import { HydratedDocument } from "mongoose";

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

  describe("signInUser", () => {
    it("should sign in a user when given valid email and password", async () => {
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

    it("should throw UnauthorizedError when user not found", async () => {
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

    it("should throw UnauthorizedError when password is incorrect", async () => {
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

  describe("signUpUser", () => {
    it("should sign up a new user when given a valid data", async () => {
      const email = "donald@gmail.com";
      const fullname = "Donald Akobundu";
      const password = "test-user";

      const mockUser = {
        _id: "1",
        email: "donald@gmail.com",
        fullname: "Donald Akobundu",
        createdAt: new Date(),
        updatedAt: new Date(),
        save: jest.fn().mockResolvedValue(true),
      } as unknown as HydratedDocument<IUser>;

      jest.spyOn(User, "findOne").mockResolvedValue(null);
      jest.spyOn(User, "build").mockReturnValue(mockUser);

      const result = await authService.signUpUser(fullname, email, password);
      expect(result).toHaveProperty("token");
      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(User.build).toHaveBeenCalledWith({
        fullname,
        email,
        password,
      });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: mockUser._id.toString(),
        fullname: mockUser.fullname,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
        token: expect.any(String),
      });
    });

    it("should throw BadRequestError when email already exists", async () => {
      const email = "test@email.com";
      const password = "test123";
      const fullname = "Test User";

      jest.spyOn(User, "findOne").mockResolvedValue(mockedUser);

      await expect(
        authService.signUpUser(fullname, email, password)
      ).rejects.toThrow("Email already exists.");
    });
  });
});
