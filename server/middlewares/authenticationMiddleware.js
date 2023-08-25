const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader.split(" ")[0] !== "Bearer") throw new Error("invalid user")

    const token = (authHeader.split(" ")[1])
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        throw new Error("invalid authentication")
    }

}
module.exports = authMiddleware