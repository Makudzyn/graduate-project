const Router = require('express');
const router = new Router();
const polynomialController = require("../controllers/polynomialController")

router.get('/', polynomialController.getAllPolynomials)
router.post('/', polynomialController.addPolynomial)
router.put('/', polynomialController.editPolynomial)
router.delete('/', polynomialController.removePolynomial)

module.exports = router;