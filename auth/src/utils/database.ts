import mongoose from "mongoose";
import { Logger } from ".";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    Logger.info("Connected to database");
  } catch (error) {
    Logger.error("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectDB;
