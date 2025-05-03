import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { currentUserRouter, signInRouter, signOutRouter, signUpRouter } from './routes';

const app = express();
app.use(morgan('dev'))
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);


export default app;