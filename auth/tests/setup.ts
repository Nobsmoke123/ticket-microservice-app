import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import "reflect-metadata";
// import app from "../src/app";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();

  if (collections) {
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  mongoServer.stop();
  await mongoose.connection.close();
});
