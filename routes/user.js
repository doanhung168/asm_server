const router = require('express-promise-router')()

const ImageController = require('../controllers/image')
const UserController = require('../controllers/user')
const AuthMiddleware = require('../middleware/authencation')

router.route('/private')
    .get(AuthMiddleware.authentication ,(req,res) => res.send('thành công'))

router.route('/images/:imageID')
    .post(AuthMiddleware.authentication, ImageController.updateImage)
    .delete(AuthMiddleware.authentication ,ImageController.deleteImage)

router.route('/images/update/:imageID')
    .get(AuthMiddleware.authentication, UserController.getUpdateImageForm)


router.route('/images')
    .get(AuthMiddleware.authentication, UserController.getAllImageOfUser)


router.route('/images')
    .post(AuthMiddleware.authentication, ImageController.newImage)

router.route('/:userID')
    .get(UserController.getUser)
    .patch(UserController.updateUser)
    .put(UserController.replaceUser)
    .delete(UserController.deleteUser)


router.route('/')
    .get(UserController.getAllUser)
    .post(UserController.newUser)

module.exports = router
