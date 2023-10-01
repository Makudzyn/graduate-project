const ApiError = require("../error/apiError");
const {HistoryRecord} = require("../models/models");

async function saveInHistory(req, res, next) {
  const {historyId, userValues, formNumber} = req.body;
  const historyRecord = await HistoryRecord.create({historyId, userValues, formNumber});
  return res.json(historyRecord);
}

async function getHistoryList(req, res) {
  const history = await HistoryRecord.findAll();
  return res.json(history);
}

async function removeHistoryRecord(req, res, next) {
  const {id} = req.body; // Из тела получаем ID записи, которую нужно удалить
  try {
    const historyRecord = await HistoryRecord.findOne({where: {id}}); // Находим запись
    if (!historyRecord) {
      return next(ApiError.notFound('History record not found')) // Если запись не найдена возвращаем ошибку
    }
    await historyRecord.destroy(); // Удаляем запись
    return res.status(204).end(); // Возвращаем ответ с кодом 204 No Content
  } catch (e) {
    return next(ApiError.internal(e.message)) // Если не удалось удалить
  }
}

module.exports = {saveInHistory, getHistoryList, removeHistoryRecord}