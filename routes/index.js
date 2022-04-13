const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/index')

router.route('/login')
    .get(IndexController.getLoginForm)

router.route('/register')
    .get(IndexController.getSignUpForm)

router.route('/')
    .get(IndexController.getHome)


module.exports = router