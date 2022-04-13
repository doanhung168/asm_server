
const getHome = async (req, res) => {
    return res.status(200).render('index')
}

const getLoginForm = (req, res) => {
    return res.status(200).render('login')
}

const getSignUpForm = (req, res) => {
    return res.status(200).render('signUp')
}

module.exports = {getLoginForm, getSignUpForm, getHome}