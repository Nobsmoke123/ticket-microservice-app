import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { authRouter } from "./routes";
import { ErrorHandler } from "./middlewares";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

app.use(ErrorHandler);

export default app;
