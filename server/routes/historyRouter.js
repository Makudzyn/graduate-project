const Router = require('express');
const router = new Router();
const historyController = require("../controllers/historyController");
const authMiddleware = require('../middleware/checkAuthAndRoleMiddleware');

router.get('/', authMiddleware(), historyController.getHistoryList)
router.post('/', authMiddleware(), historyController.saveInHistory)
// router.put('/',)
router.delete('/', authMiddleware(), historyController.removeHistoryRecord)

module.exports = router;