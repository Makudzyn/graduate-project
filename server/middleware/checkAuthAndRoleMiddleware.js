const jwt = require("jsonwebtoken");
const ApiError = require("../error/apiError.js");

// Универсальный middleware для проверки авторизации и роли пользователя
module.exports = function (requiredRole) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") { // Нужны только POST, PUT, GET, DELETE
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return next(ApiError.badRequest("Jwt-token was not provided!"));
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (requiredRole && decoded.role !== requiredRole) {
        return next(ApiError.forbidden("You don't have permission for this."));
      }
      req.user = decoded;
      next();
    } catch (e) {
      return next(ApiError.unauthorized(e.message));
    }
  };
};
