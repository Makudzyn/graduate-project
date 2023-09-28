const ApiError = require("../error/ApiError.js");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) { // Если класс ошибки ApiError то ответом возвращаем статус код и сообщение
    return res.status(err.status).json({message: err.message})
  }
  return res.status(500).json({message: "Unpredictable error."}) // На случай если ошибка никак не обработана в ApiError
}