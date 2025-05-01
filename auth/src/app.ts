import express, { Request, Response } from 'express';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/users/currentUser', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Auth service is running'
    })
});

export default app;