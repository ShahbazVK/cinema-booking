const Movies = require('../models/Movies');
const {
    StatusCodes
} = require('http-status-codes')
const asyncWrapper = require('../middlewares/asyncWrapper');

const getMovies = asyncWrapper(async (req, res) => {
    const {
        isUpcoming
    } = req.query

    const movies = await Movies.find({
        isUpcoming
    }).select("name img -_id")

    res.status(StatusCodes.OK).json({
        movies
    })
})

const getSeats = asyncWrapper(async (req, res) => {
    const {
        movie
    } = req.query

    const movieInfo = await Movies.findOne({
        name: movie,
        isUpcoming: false
    }).select("name price seats -_id")

    res.status(StatusCodes.OK).json({
        movieInfo
    })
})

const updateSeats = asyncWrapper(async (req, res) => {
    const {
        movie,
        seats
    } = req.body

    const movieInfo = await Movies.findOneAndUpdate({
        name: movie,
        isUpcoming: false
    }, {
        seats
    }, {
        new: true,
        runValidators: true
    })

    res.status(StatusCodes.OK).json({
        movieInfo
    })
})

module.exports = {
    getMovies,
    getSeats,
    updateSeats,
}