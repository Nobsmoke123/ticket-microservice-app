import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
  notFoundRouter,
} from "./routes";
import errorHandler from "./middlewares/error-handler";

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.use(notFoundRouter);

app.use(errorHandler);

export default app;
