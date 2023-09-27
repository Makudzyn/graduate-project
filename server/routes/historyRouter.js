const Router = require('express');
const router = new Router();
const historyController = require("../controllers/historyController");

router.get('/', historyController.getHistoryList)
router.post('/', historyController.saveInHistory)
// router.put('/',)
router.delete('/', historyController.removeHistoryRecord)

module.exports = router;