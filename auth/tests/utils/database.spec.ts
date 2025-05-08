import mongoose from "mongoose";
import Logger from "../../src/utils/logger";
import connectDB from "../../src/utils/database";

describe("Database Connection", () => {
  process.env.MONGO_URI = "testMongoURI";

  it("should connect to the database", async () => {
    jest
      .spyOn(mongoose, "connect")
      .mockImplementation(() =>
        Promise.resolve({} as typeof import("mongoose"))
      );
    jest.spyOn(Logger, "info").mockImplementation(() => Logger);

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(Logger.info).toHaveBeenCalledWith("Connected to database");
  });

  it("should handle connection errors", async () => {
    jest.spyOn(Logger, "error").mockImplementation(() => Logger);
    jest.spyOn(mongoose, "connect").mockImplementation(() => {
      throw new Error("Connection error");
    });
    jest.spyOn(process, "exit").mockReturnThis();

    await connectDB();
    expect(Logger.error).toHaveBeenCalledWith(
      "Error connecting to database",
      expect.any(Error)
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
