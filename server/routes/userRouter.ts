import { Router } from 'express';
import {registration, login, check, deleteOne} from '../controllers/userController';
import authMiddleware from '../middleware/checkAuthAndRoleMiddleware';

const router = Router();

router.post('/registration', registration);
router.post('/login', login);
router.get('/auth', authMiddleware(), check);
router.delete('/:id', authMiddleware("ADMIN"), deleteOne);

export default router;