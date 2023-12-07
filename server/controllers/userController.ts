import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';
import { User, History } from '../models/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Типы для данных, используемых в JWT-токене
type TokenData = {
  id: number;
  email: string;
  role: string;
};

// Тип для JWT-токена
type Token = string;

// Функция создания JWT-токена
const generateJWT = (id: number, email: string, role: string): Token => {
  return jwt.sign(
      { id, email, role } as TokenData,
      process.env.SECRET_KEY as string,
      { expiresIn: '24h' }
  );
};

// Функция регистрации нового пользователя
async function registration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return next(ApiError.badRequest('Empty field of password or email!'));
  }
  try {
    const isExists = await User.findOne({ where: { email } });
    if (isExists) {
      return next(ApiError.badRequest('User with this email already exists!'));
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({ email, role, password: hashPassword });
    await History.create({ userId: user.id });
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  } catch (error: unknown) {
    return next(ApiError.internal((error as Error).message));
  }
}

// Функция авторизации пользователя
async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const {email, password} = req.body; // Получаем email и пароль из тела запроса
  const user = await User.findOne({where: {email}}); // Проверяем есть ли зарегистрированный пользователь с таким email`ом
  if (!user) {
    return next(ApiError.notFound("There is no user with this email!")); // Если нет возвращаем ошибку
  }
  let comparePassword = bcrypt.compareSync(password, user.password); // Дехешируем пароль и сравниваем с тем, который получили из тела запроса
  if (!comparePassword) {
    return next(ApiError.badRequest("Wrong password.")); // Если пароли не совпадают возвращаем ошибку
  }
  const token = generateJWT(user.id, user.email, user.role); // Если все ок - генерируем токен
  return res.json({token});
}

// Функция, которая возвращает новый токен
async function check(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  // @ts-ignore
  const token = generateJWT(req.user.id, req.user.email, req.user.role); // Генерируем новый токен
  return res.json({token});
}



// Функция удаления пользователя по ID
async function deleteOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const {id} = req.params; // Получаем ID из параметров
  try {
    const user = await User.findOne({where: {id}}); // Находим пользователя
    const history = await History.findOne({where: {id}}); // Находим корзину пользователя
    if (!user) {
      return next(ApiError.notFound('User is not found')); // Если пользователь не был найден возвращаем ошибку
    }
    if (!history) {
      return next(ApiError.notFound('User`s history not found')); // Если пользователь не был найден возвращаем ошибку
    }
    await user.destroy(); // Удаляем пользователя
    await history.destroy(); // Удаляем карзину привязанную к пользователю
    return res.status(204).end(); // Возвращаем ответ с кодом 204 No Content
  } catch (error: unknown) {
    return next(ApiError.internal((error as Error).message)); // Если не удалось удалить пользователя
  }
}

  export {
    registration,
    login,
    check,
    deleteOne,
  };