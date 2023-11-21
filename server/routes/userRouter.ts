import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/checkAuthAndRoleMiddleware';

const router = Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware(), userController.check);
router.delete('/:id', authMiddleware("ADMIN"), userController.deleteOne);

export default router;