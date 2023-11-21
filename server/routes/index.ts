import { Router } from 'express';
import polynomialRouter from './polynomialRouter';
import historyRouter from './historyRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/history', historyRouter);
router.use('/polynomials', polynomialRouter);
router.use('/user', userRouter);

export default router;
