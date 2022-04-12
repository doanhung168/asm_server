const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    tag: [{type: String}],
    image: {type: String},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Image = mongoose.model('Image', ImageSchema)
module.exports = Image