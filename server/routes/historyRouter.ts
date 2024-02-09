import { Router } from 'express';
import {getHistoryList, saveInHistory, removeHistoryRecord} from '../controllers/historyController';
import authMiddleware from '../middleware/checkAuthAndRoleMiddleware';

const router = Router();

router.get('/get-history-list', authMiddleware(), getHistoryList);
router.post('/save-in-history', authMiddleware(), saveInHistory);
// router.put('/',);
router.delete('/', authMiddleware(), removeHistoryRecord);

export default router;
