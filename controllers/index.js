const Image = require('../models/image')

const index = async (req, res) => {
    const images = await Image.find().limit(PAGE_SIZE)
    if (res.locals.user) {
        const userID = res.locals.user._id.toString()
        const name = res.locals.user.firstName.toString() + ' ' + res.locals.user.lastName.toString()
        return res.status(200).render('index', {userID: userID, data: images, name})
    } else {
        return res.status(200).render('index', {userID: '', data: images, name: ''})
    }

}

const getLoginForm = (req, res) => {
    return res.status(200).render('login')
}

const getSignUpForm = (req, res) => {
    return res.status(200).render('signUp')
}

const PAGE_SIZE = 6
const getData = async (req, res) => {
    let _page = req.query.page
    if (_page) {
        _page = parseInt(_page)
        const skip = (_page - 1) * PAGE_SIZE;
        Image.find({})
            .skip(skip)
            .limit(PAGE_SIZE)
            .exec((err, doc) => {
                Image.count().exec((err, count) => {
                    res.json({
                        photos: {
                            page: _page,
                            pages: count / PAGE_SIZE,
                            perpage: PAGE_SIZE,
                            total: count,
                            photo: doc,
                            stat: 'ok',
                        }
                    })
                })

            })


    } else {
        const images = await Image.find()
        return res.json({images})
    }
}

module.exports = {index, getLoginForm, getSignUpForm, getData}