const Router = require('express');
const router = new Router();
const polynomialController = require("../controllers/polynomialController")
const authMiddleware = require("../middleware/checkAuthAndRoleMiddleware");

router.get('/', polynomialController.getAllPolynomials)
router.post('/', authMiddleware(), polynomialController.addPolynomial)
router.put('/', authMiddleware(), polynomialController.editPolynomial)
router.delete('/', authMiddleware(), polynomialController.removePolynomial)

module.exports = router;