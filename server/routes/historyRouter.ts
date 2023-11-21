import { Router } from 'express';
import {getHistoryList, saveInHistory, removeHistoryRecord} from '../controllers/historyController';
import authMiddleware from '../middleware/checkAuthAndRoleMiddleware';

const router = Router();

router.get('/', authMiddleware(), getHistoryList);
router.post('/', authMiddleware(), saveInHistory);
// router.put('/',);
router.delete('/', authMiddleware(), removeHistoryRecord);

export default router;
