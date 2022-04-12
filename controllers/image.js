const Image = require('../models/image')
const User = require('../models/user')
const multer = require('multer')

const uploadImage = require('../middleware/uploadImage')
const upload = uploadImage.single('image')

const getAllImage = async (req, res) => {
    const images = await Image.find()
    return res.status(200).json({images})
}

const getImage = async (req, res) => {
    const {imageID} = req.params
    const image = await Image.findById(imageID)
    return res.render('imageDetail', { data : image})
}

const getImageDataByID = async (req, res) => {
    const {imageID} = req.params
    const image = await Image.findById(imageID)
    return res.json({ result : image, error: null})
}


const newImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err.message)
        } else if (err) {
            console.log(err.message)
        }

        const {name, description, tag1, tag2} = req.body
        const tag = [tag1, tag2]
        console.log(req.file.path)
        const image = getUrlImage(req.file.path)

        const newImage = new Image({name, description, tag, image})
        const userID = res.locals.user._id.toString()
        const user = await User.findById(userID)
        if (user != null) {
            newImage.owner = user
            await newImage.save()

            user.images.push(newImage._id)
            await user.save()
            return res.status(201).send({result: 'redirect', url:'/users/images'})
        }
    })



}

const updateImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err.message)
        } else if (err) {
            console.log(err.message)
        }
        const {imageID} = req.params
        const userID = res.locals.user._id.toString()

        const {name, tag1, tag2, description} = req.body
        const imageNeedUpdate = {name: name, tag: [tag1, tag2], description: description}
        if(req.file) {
            const image = getUrlImage(req.file.path)
            if(image !== '') {
                imageNeedUpdate.image = image
            }
        }
        const user = await User.findById(userID)
        if (user) {
            const result = await Image.updateOne({_id: imageID}, imageNeedUpdate)
            if (result.acknowledged) {
                const imageAfterUpdate = await Image.findById(imageID)
                const size = user.images.length
                for (let i = 0; i < size; i++) {
                    if (user.images[i]._id === imageID) {
                        user.images[i] = imageAfterUpdate
                        break
                    }
                }
                await user.save()
                return res.status(200).json({data: imageAfterUpdate})
            }
        }

    })

}

const deleteImage = async (req, res) => {
    try {
        const {imageID} = req.params
        const userID = res.locals.user._id.toString()
        const user = await User.findById(userID)
        if (user) {
            const image = await Image.findById(imageID)
            if (image) {
                if (image.owner._id.toString() === userID) {
                    const result = await Image.deleteOne({_id: imageID})
                    if (result) {
                        const index = user.images.findIndex((item) => {
                            return item.toString() === imageID
                        })
                        if (index !== -1) {
                            user.images.splice(index, 1)
                            await user.save()

                            const user1 = await User.findById(userID).populate('images')
                            const data = []
                            for(const e of user1.images) {
                                data.push(e)
                            }
                            return res.status(200).json({data})
                        } else {
                            return res.status(403).json({error: {message: 'Auth permission error 1'}})
                        }
                    }
                } else {
                    return res.status(403).json({error: {message: 'Auth permission error'}})
                }
            }
        }
    } catch (e) {
        console.log(e.message)
    }
}

const getUrlImage = (filePath) => {
    try {
        const array = filePath.split('/')
        return "/" + array[1] + '/' + array[2]
    } catch (e) {
        console.log(e.message)
        return ''
    }
}


module.exports = {getAllImage, getImage, newImage, updateImage, deleteImage}