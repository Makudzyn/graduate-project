const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/checkAuthAndRoleMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware(), userController.check);
router.delete('/:id', authMiddleware("ADMIN"), userController.deleteOne);


module.exports = router;