const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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

const UserSchema = new mongoose.Schema({
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
})

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    // console.log("this.password", this.password);
    // console.log("candidatePassword", candidatePassword);
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

UserSchema.methods.createJWT = async function (userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    return token
}

module.exports = mongoose.model("User", UserSchema)