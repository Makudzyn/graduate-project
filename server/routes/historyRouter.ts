import { Router } from 'express';
import {getHistoryList, saveNewHistoryRecord, removeHistoryRecord} from '../controllers/historyController';
import authMiddleware from '../middleware/checkAuthAndRoleMiddleware';

const router = Router();

router.get('/get-history-list', authMiddleware(), getHistoryList);
router.post('/save-in-history', authMiddleware(), saveNewHistoryRecord);
// router.put('/',);
// router.delete('/', authMiddleware(), removeHistoryRecord);

export default router;
