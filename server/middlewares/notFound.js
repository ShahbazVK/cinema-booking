const notFound = (req, res) => {
    res.status(404).json({ msg: "invalid api" })
}
module.exports = notFound