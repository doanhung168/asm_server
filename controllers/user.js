const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Image = require('../models/image')

const getAllUser = async (req, res) => {
    const user = await User.find()
    return res.status(200).json({user})
}

const newUser = async (req, res, next) => {

    const {firstName, lastName, email} = req.body
    const foundUser = await User.findOne({email})
    if (foundUser) {
        return res.json({result: 'Email is already'})
    }

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            if (err) {
                next(err)
            }
            const newUser = new User({firstName, lastName, email, password: hash})
            await newUser.save()
            return res.status(201).json({result: 'Sign Up successfully'})
        });
    });
}


const getUser = async (req, res) => {
    const {userID} = req.params
    const user = await User.findById(userID)
    return res.status(200).json({user})
}

const userLogin = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    console.log(user)
    if (user) {
        bcrypt.compare(password, user.password, async (err, result) => {
            if (err) {
                return res.json({error: {message: err.message}})
            }
            if (result) {
                const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '72h'})
                res.cookie('token', token, {signed: true, expires: new Date(Date.now() + 900000)})
                return res.status(200).json({success: true})
            } else {
                res.json({success: false, message: 'Vui lòng kiểm tra email hoặc mật khẩu'})
            }

        })
    } else {
        res.json({success: false, message: 'Vui lòng kiểm tra email hoặc mật khẩu'})
    }


}

const updateUser = async (req, res) => {
    const {userID} = req.params
    const newUser = req.body
    await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({success: true})
}

const replaceUser = async (req, res) => {
    const {userID} = req.params
    const newUser = req.body
    await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({success: true})
}

const deleteUser = async (req, res) => {
    const {userID} = req.params
    const result = await User.findByIdAndDelete(userID)
    console.log(result)
    return res.status(200).json({success: true})
}

const getAllImageOfUser = async (req, res) => {
    const userID = res.locals.user._id.toString()
    const user = await User.findById(userID).populate('images')
    const data = []
    for (const e of user.images) {
        data.push(e)
    }
    return res.status(200).render('productOfUser', {data})
}

const getUpdateImageForm = async (req, res, next) => {
    const {imageID} = req.params
    const image = await Image.findById(imageID)
    if (image) {
        return res.status(200).render('updateImage', {data: image})
    } else {
        return next()
    }
}


module.exports = {
    getAllUser,
    newUser,
    getUser,
    replaceUser,
    updateUser,
    deleteUser,
    getAllImageOfUser,
    userLogin,
    getUpdateImageForm
}
