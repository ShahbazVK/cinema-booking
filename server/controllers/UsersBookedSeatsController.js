const UsersBookedSeatsModel = require('../models/UsersBookedSeats');
const {
    StatusCodes
} = require('http-status-codes')
const asyncWrapper = require('../middlewares/asyncWrapper');

const updateMovieSeats = asyncWrapper(async (req, res) => {
    const {
        userId,
        currentMovie,
    } = req.body

    try {
        const completeRecordOfBooking = await UsersBookedSeatsModel.findOne({
            userId
        })
        // for (let index = 0; index < completeRecordOfBooking.movie.length; index++) {
        //     if (completeRecordOfBooking.movie[index][0] && (completeRecordOfBooking.movie[index][0] === currentMovie[0])) {
        //         completeRecordOfBooking.movie.pop(index)
        //         break
        //     }
        // }
        completeRecordOfBooking.movie = currentMovie

        await UsersBookedSeatsModel.deleteOne({
            userId
        })
        const saved = await UsersBookedSeatsModel.create({
            userId: completeRecordOfBooking.userId,
            movie: completeRecordOfBooking.movie
        })

        res.status(StatusCodes.OK).json({
            saved
        })
    } catch (e) {
        console.log(e)
        const saved = await UsersBookedSeatsModel.create({
            userId,
            movie: currentMovie
        })
        res.status(StatusCodes.OK).json({
            saved
        })
    }

})


const getUserSeats = asyncWrapper(async (req, res) => {
    const {
        userId
    } = req.query

    try {
        const completeRecordOfBooking = await UsersBookedSeatsModel.findOne({
            userId
        })

        res.status(StatusCodes.OK).json({
            bookedMovies: completeRecordOfBooking.movie
        })
    } catch (e) {
        throw new Error("No movie booked ever")
    }

})

module.exports = {
    updateMovieSeats,
    getUserSeats
}