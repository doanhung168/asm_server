const router = require('express-promise-router')()

const ImageController = require('../controllers/image')
const UserController = require('../controllers/user')
const AuthMiddleware = require('../middleware/authencation')


router.route('/images/:imageID/update')
    .get(AuthMiddleware.authentication, ImageController.getUpdateImageForm)
    .post(AuthMiddleware.authentication, ImageController.updateImage)

router.route('/images/:imageID/delete')
    .post(AuthMiddleware.authentication ,ImageController.deleteImage)


router.route('/images')
    .get(AuthMiddleware.authentication, UserController.getAllImageOfUser)


router.route('/images')
    .post(AuthMiddleware.authentication, ImageController.newImage)


router.route('/login')
    .post(UserController.userLogin)

router.route('/register')
    .post(UserController.newUser)

router.route('/getCurrentUserID')
    .get(UserController.getCurrentUser)


module.exports = router
