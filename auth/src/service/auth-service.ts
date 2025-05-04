import { injectable } from "tsyringe";
import { BadRequestError, UnauthorizedError } from "../errors";
import User from "../models/user";

@injectable()
export default class AuthService {
  signInUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    if (await user.comparePassword(password)) {
      return {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: "", // Token generation logic should be added here
      };
    } else {
      throw new UnauthorizedError("Invalid credentials.");
    }
  };

  signUpUser = async (fullname: string, email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError("Email already exists.");
    }
    const newUser = User.build({ fullname, email, password });
    await newUser.save();

    return {
      id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      token: "", // Token generation logic should be added here
    };
  };
}
