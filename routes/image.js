const router = require('express-promise-router')()
const ImageController = require('../controllers/image')

router.route('/')
    .get(ImageController.getImages)

router.route('/:imageID')
    .get(ImageController.getImageByID)

module.exports = router