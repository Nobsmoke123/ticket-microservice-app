import express from 'express';
import { currentUserRouter, signInRouter, signOutRouter, signUpRouter } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);


export default app;