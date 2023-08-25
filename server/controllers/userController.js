const User = require('../models/User');
const jwt = require('jsonwebtoken')
const {
    StatusCodes
} = require('http-status-codes')
const asyncWrapper = require('../middlewares/asyncWrapper');

const register = asyncWrapper(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    if (!name || !email || !password) throw Error("provide all the fields")

    try {
        await User.create({
            name,
            email,
            password
        })

        res.status(StatusCodes.CREATED).send(null)
    } catch (e) {
        throw new Error("Already registered with this email")
    }
})

const login = asyncWrapper(async (req, res) => {
    const {
        email,
        password
    } = req.body
    if (!email || !password) throw Error("provide all the fields")

    const user = await User.findOne({
        email
    })

    if (!user) throw new Error("email is not registered")

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) throw Error("incorrect password")

    res.status(StatusCodes.OK).json({
        userId: user._id,
        token: await user.createJWT(user._id)
    })
})

module.exports = {
    register,
    login,
}