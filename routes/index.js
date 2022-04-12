const router = require('express-promise-router')()
const IndexController = require('../controllers/index')
const UserController = require('../controllers/user')
const AuthController = require('../middleware/authencation')

router.route('/login')
    .get(IndexController.getLoginForm)
    .post(UserController.userLogin)

router.route('/register')
    .get(IndexController.getSignUpForm)
    .post(UserController.newUser)

router.route('/')
    .get(AuthController.indexAuthentication, IndexController.index)


router.route('/getData')
    .get(IndexController.getData)


module.exports = router