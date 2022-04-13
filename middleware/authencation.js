const User = require('../models/user')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    try {
        if(req.signedCookies.token) {
            jwt.verify(req.signedCookies.token, process.env.SECRET, async function(err, decoded) {
                if(err) {
                    return res.redirect('/login')
                }
                const user = await User.findOne({_id: decoded.id})
                if(user) {
                    res.locals.user = user
                    next()
                }
            });
        } else {
            return res.redirect('/login')
        }
    } catch (e) {
        console.log(e.message || e)
        return res.redirect('/login')
    }
}

module.exports = {authentication}
