const ApiError = require("../error/apiError");
const {Polynomial} = require("../models/models");

async function addPolynomial(req, res, next) {
  const {name, degree, polynomial} = req.body;
  const poly = await Polynomial.create({name, degree, polynomial});
  return res.json(poly);
}

async function getAllPolynomials(req, res) {
  const polynomials = await Polynomial.findAll();
  return res.json(polynomials);
}

async function removePolynomial(req, res, next) {

}

async function editPolynomial(req, res, next) {

}

module.exports = {addPolynomial, getAllPolynomials, removePolynomial, editPolynomial}