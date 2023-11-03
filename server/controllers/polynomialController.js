const ApiError = require("../error/apiError");
const {Polynomial} = require("../models/models");

async function addPolynomial(req, res, next) {
  const {name, degree, polynomial} = req.body;
  const poly = await Polynomial.create({name, degree, polynomial});
  return res.json(poly);
}

async function addManyPolynomials(req, res, next) {
  const polynomials = req.body; // Предполагается, что тело запроса содержит массив полиномов

  const createdPolynomials = [];

  for (const polynomialData of polynomials) {
    const { name, degree, polynomial } = polynomialData;
    const poly = await Polynomial.create({ name, degree, polynomial });
    createdPolynomials.push(poly);
  }

  return res.json(createdPolynomials);
}

async function getAllPolynomials(req, res) {
  const polynomials = await Polynomial.findAll();
  return res.json(polynomials);
}

async function removePolynomial(req, res, next) {
  const {id} = req.body; // Из тела получаем ID полинома, которую нужно удалить
  try {
    const polynomial = await Polynomial.findOne({where: {id}}); // Находим полином
    if (!polynomial) {
      return next(ApiError.notFound('Polynomial not found')) // Если полином не найден возвращаем ошибку
    }
    await polynomial.destroy(); // Удаляем полином
    return res.status(204).end(); // Возвращаем ответ с кодом 204 No Content
  } catch (e) {
    return next(ApiError.internal(e.message)) // Если не удалось удалить
  }
}

async function editPolynomial(req, res, next) {

}

module.exports = {addPolynomial, addManyPolynomials, getAllPolynomials, removePolynomial, editPolynomial}