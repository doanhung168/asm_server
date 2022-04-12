const User = require('../models/user')
const jwt = require('jsonwebtoken')
const authentication = (req, res, next) => {
    if(!req.signedCookies.token) {
        return res.redirect('/login')
    }

    jwt.verify(req.signedCookies.token, process.env.SECRET, async function(err, decoded) {
        if(err) {
            return res.redirect('/login')
        }
        const user = await User.findOne({_id: decoded})
        console.log(user)
        if(user) {
            res.locals.user = user
            next()
        }
    });
}


const indexAuthentication = (req, res, next) => {
    if(req.signedCookies.token) {
        jwt.verify(req.signedCookies.token, process.env.SECRET, async function(err, decoded) {
            if(err) {
                return res.redirect('/login')
            }
            const user = await User.findOne({id: decoded})
            if(user) {
                res.locals.user = user
                next()
            }
        });
    } else {
        next()
    }
}

module.exports = {authentication, indexAuthentication}
