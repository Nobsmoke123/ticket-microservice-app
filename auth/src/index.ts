import http from "node:http";
import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./utils";
dotenv.config();

const PORT = parseInt(process.env?.PORT || "4000");
const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Auth service is runnning on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
};

startServer();
