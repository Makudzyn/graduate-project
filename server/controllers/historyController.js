const ApiError = require("../error/apiError");
const {HistoryRecord} = require("../models/models");

async function saveInHistory(req, res, next) {
  const {historyId, userValues, formNumber} = req.body;
  const historyRecord = await HistoryRecord.create({historyId, userValues, formNumber});
  return res.json(historyRecord);
}

async function getHistoryList(req, res) {

}

async function removeHistoryRecord(req, res, next) {

}

module.exports = {saveInHistory, getHistoryList, removeHistoryRecord}