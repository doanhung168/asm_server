const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const getCurrentUser = async (req, res) => {
    try {
        const token = req.signedCookies.token
        if (token) {
            jwt.verify(token, process.env.SECRET, {}, async function (err, decode) {
                if (err) {
                    return res.json({result: {success: false, data: null, message: err.message || 'Đã có lỗi xảy ra'}})
                }
                const userID = decode.id
                const user = await User.findById(userID)
                if (user) {
                    return res.json({result: {success: true, data: user, message: 'ok'}})
                } else {
                    return res.json({result: {success: false, data: null, message: 'Đã có lỗi xảy ra'}})
                }

            })
        } else {
            return res.json({result: {success: true, data: null, message: 'ok'}})
        }
    } catch (e) {
        return res.json({result: {success: false, data: null, message: e.message || 'Đã có lỗi xảy ra'}})
    }
}

const newUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body
        const foundUser = await User.findOne({email})
        if (foundUser) {
            return res.json({
                result: {
                    success: false,
                    message: 'Email đã được đăng kí từ trước'
                }
            })
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.json({
                        result: {
                            success: false,
                            message: err.message
                        }
                    })
                }
                const newUser = new User({firstName, lastName, email, password: hash})
                await newUser.save()
                return res.status(201).json({
                    result: {
                        success: true,
                        message: 'Đăng kí tài khoản thành công!'
                    }
                })
            });
        });
    } catch (e) {
        return res.status(201).json({
            result: {
                success: true,
                message: e.message || 'Đã có lỗi xảy ra'
            }
        })
    }
}


const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        console.log(user)
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (err) {
                    return res.json({result: {success: false, message: err.message}})
                }
                if (result) {
                    const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '72h'})
                    res.cookie('token', token, {signed: true, expires: new Date(Date.now() + 900000)})
                    return res.status(200).json({result: {success: true, message: 'Đăng nhập thành công'}})
                } else {
                    return res.json({result: {success: false, message: 'Vui lòng kiểm tra email hoặc mật khẩu'}})
                }

            })
        } else {
            return res.json({result: {success: false, message: 'Vui lòng kiểm tra email hoặc mật khẩu'}})
        }
    } catch (e) {
        return res.json({result: {success: false, message: e.message || 'Đã có lỗi xảy ra'}})
    }
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


module.exports = {
    newUser,
    getAllImageOfUser,
    userLogin,
    getCurrentUser
}


