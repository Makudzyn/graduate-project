const Router = require('express');
const router = new Router();

const polynomialRouter = require("./polynomialRouter");
const historyRouter = require("./historyRouter");
const userRouter = require("./userRouter");

router.use('/history', historyRouter)
router.use('/polynomial', polynomialRouter)
router.use('/user', userRouter)


module.exports = router;