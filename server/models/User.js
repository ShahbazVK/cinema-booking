const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
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
    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
    return token
}

module.exports = mongoose.model("User", UserSchema)