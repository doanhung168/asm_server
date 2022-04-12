const router = require('express-promise-router')()
const ImageController = require('../controllers/image')

router.route('/')
    .get(ImageController.getAllImage)

router.route('/:imageID')
    .get(ImageController.getImage)

module.exports = router