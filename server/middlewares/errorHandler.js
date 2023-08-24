const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(400).json(err.message)
}
module.exports = errorHandlerMiddleware