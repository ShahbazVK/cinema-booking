const express = require('express');
const {
    updateMovieSeats,
    getUserSeats
} = require('../controllers/UsersBookedSeatsController');
const router = express.Router()

router.post('/', updateMovieSeats)
router.get('/', getUserSeats)

module.exports = router