const mongoose = require('mongoose');

const UsersBookedSeatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
    },
    // [ 
    // ["Pathann",[nested array of seats], total price,], 
    // [], 
    // [], 
    // [], 
    // [], 
    // [], 
    //  ]
    movie: {
        type: Array,
        required: true,
    },
})

module.exports = mongoose.model("UsersBookedSeat", UsersBookedSeatsSchema)