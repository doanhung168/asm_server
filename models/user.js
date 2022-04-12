const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        default: []
    }]
}, {timestamps: true})


const User = mongoose.model('User', UserSchema)
module.exports = User