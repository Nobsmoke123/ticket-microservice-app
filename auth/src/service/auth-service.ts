import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import User from "../models/user";

export default class AuthService {
  signInUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (await user.comparePassword(password)) {
      return {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: "", // Token generation logic should be added here
      };
    } else {
      throw new UnauthorizedError("Invalid credentials.");
    }
  };

  signUpUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError("Email already exists.");
    }
    const newUser = User.build({ email, password });
    await newUser.save();

    return {
      id: newUser._id,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      token: "", // Token generation logic should be added here
    };
  };
}
