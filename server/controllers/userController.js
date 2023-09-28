const ApiError = require("../error/apiError.js")
const {User, History} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Функция создания JWT-токена
const generateJWT = (id, email, role) => {
  return jwt.sign(
    {id, email, role}, // Параметры которые передаем в payload
    process.env.SECRET_KEY, // Ключ, по которому выполняется "кодировка"
    {expiresIn: "24h"} // Время жизни токена
  )
}

// Функция регистрации нового пользователя
async function registration(req, res, next) {
  const {email, password, role} = req.body; // Из тела запроса получаем данные пользователя
  if (!email || !password) {
    return next(ApiError.badRequest("Empty field of password or email!")); // Если email или пароль не заданы - возвращаем ошибку
  }
  const isExists = await User.findOne({where: {email}}); // Ищем есть ли уже зарегистрированный пользователь с такой почтой
  if (isExists) {
    return next(ApiError.badRequest("User with this email already exists!")); // Если есть - возвращаем ошибку
  }
  const hashPassword = await bcrypt.hash(password, 3); // Хешируем пароль пользователя и указываем сколько раз
  const user = await User.create({email, role, password: hashPassword}); // Создаем пользователя и передаем захешированный пароль
  const history = await History.create({userId: user.id}); // Создаем корзину для пользователя
  const token = generateJWT(user.id, user.email, user.role); // Получаем токен из функции
  return res.json({token});
}

// Функция авторизации пользователя
async function login(req, res, next) {
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

// Функция которая возвращает новый токен
async function check(req, res) {
  const token = generateJWT(req.user.id, req.user.email, req.user.role); // Генерируем новый токен
  return res.json({token});
}

// Функция удаления пользователя по ID
async function deleteOne(req, res, next) {
  const {id} = req.params; // Получаем ID из параметров
  try {
    const user = await User.findOne({where: {id}}); // Находим пользователя
    const history = await History.findOne({where: {id}}); // Находим корзину пользователя
    if (!user) {
      return next(ApiError.notFound('User not found')); // Если пользователь не был найден возвращаем ошибку
    }
    await user.destroy(); // Удаляем пользователя
    await history.destroy(); // Удаляем карзину привязанную к пользователю
    return res.status(204).end(); // Возвращаем ответ с кодом 204 No Content
  } catch (e) {
    return next(ApiError.internal(e.message)); // Если не удалось удалить пользователя
  }
}

module.exports = {registration, login, check, deleteOne}