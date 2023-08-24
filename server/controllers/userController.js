const User = require('../models/User');
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const asyncWrapper = require('../middlewares/asyncWrapper');

const register = asyncWrapper(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) throw Error("provide all the fields")

    const user = await User.create({ name, email, password })

    res.status(StatusCodes.CREATED).json({ user })
})

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) throw Error("provide all the fields")

    const user = await User.findOne({ email })

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) throw Error("incorrect password")

    res.status(StatusCodes.OK).json({ token: await user.createJWT(user._id) })
})


//remove when deploying the final application
const showAll = asyncWrapper(async (req, res) => {
    const user = await User.find()
    res.status(StatusCodes.OK).json({ user })
})

module.exports = { register, login, showAll }