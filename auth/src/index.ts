import http from "node:http";
import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./utils";
import { Logger } from "./utils";
import "./global/global";

dotenv.config();

const PORT = parseInt(process.env?.PORT || "4000");
const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, "0.0.0.0", () => {
      Logger.info(`Auth service is runnning on port ${PORT}`);
    });
  } catch (error) {
    Logger.error("Error starting server", error);
    process.exit(1);
  }
};

startServer();
