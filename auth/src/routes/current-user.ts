import { Router, Request, Response} from 'express';

const router = Router();

router.get('/api/users/currentUser', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Auth service is running'
    })
});

export { router as currentUserRouter };