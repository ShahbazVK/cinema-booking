const express = require('express');
const {
    getMovies,
    getSeats,
    updateSeats
} = require('../controllers/moviesController');
const router = express.Router()

router.get('/movies', getMovies)
router.get('/seats', getSeats)
router.patch('/update-seats', updateSeats)

module.exports = router