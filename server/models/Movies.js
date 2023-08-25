const mongoose = require('mongoose');

const allEmptySeats = () => {
    const rows = 9;
    const columns = 10;
    const seats = []

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            // const randomDigit = Math.floor(Math.random() * 2); // Generates either 0 or 1
            row.push(1);
        }
        seats.push(row);
    }
    seats.push([1, 1, 1, 1, 1, 1])
    return seats;
}

const MoviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    seats: {
        type: Array,//how to set initial value
        required: true,
        default: allEmptySeats(),
    },
    isUpcoming: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default:0
    },
    img:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Movie", MoviesSchema)