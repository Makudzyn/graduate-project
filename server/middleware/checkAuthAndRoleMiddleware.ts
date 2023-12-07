import {Request, Response, NextFunction, RequestHandler} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import ApiError from "../error/apiError";


// Создаем пользовательский интерфейс расширяющий интерфейс Request
interface AuthRequest extends Request {
  user?: Record<string, any>; // Добавляем свойство user в объект Request
}

type AuthMiddleware = (requiredRole?: string) => (
  req: AuthRequest, // Используем расширенный интерфейс AuthRequest
  res: Response,
  next: NextFunction,
) => void;


// Универсальный middleware для проверки авторизации и роли пользователя
const authMiddleware: AuthMiddleware = (requiredRole) => (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(ApiError.badRequest("Jwt-token was not provided!"));
    }
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);
    if (requiredRole && decoded.role !== requiredRole) {
      return next(ApiError.forbidden("You don't have permission for this."));
    }
    req.user = decoded;
    next();
  } catch (error: unknown) {
    // явно указываем тип для ошибки как unknown
    return next(ApiError.unauthorized((error as Error).message)); // приведение типа к Error
  }
};

export default authMiddleware;
