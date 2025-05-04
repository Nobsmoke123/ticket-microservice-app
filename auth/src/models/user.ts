import { Schema, model, Model, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserAttribute = { fullname: string; email: string; password: string };

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
  build(attributes: UserAttribute): HydratedDocument<IUser>;
}

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
    autoIndex: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  if (this.password) {
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.build = (
  attributes: UserAttribute
): HydratedDocument<IUser> => {
  return new User(attributes);
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return this.password
    ? await bcrypt.compare(candidatePassword, this.password)
    : false;
};

const User = model<IUser, IUserModel>("User", userSchema);

export default User;
