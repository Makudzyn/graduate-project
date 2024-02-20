import { Router } from 'express';
import {
  getHistoryList,
  createHistoryRecord,
  deleteHistoryRecord,
  deleteAllHistoryRecords
} from "../controllers/historyController";
import authMiddleware from '../middleware/checkAuthAndRoleMiddleware';

const router = Router();

router.get('/get-history-list', authMiddleware(), getHistoryList);
router.post('/save-in-history', authMiddleware(), createHistoryRecord);
router.delete('/delete-one-record', authMiddleware(), deleteHistoryRecord);
router.delete('/delete-all-page-records', authMiddleware(), deleteAllHistoryRecords);

export default router;
