import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieSession from "cookie-session";
import { authRouter } from "./routes";
import { ErrorHandler } from "./middlewares";
import "./config/container";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

app.use(ErrorHandler);

export default app;
