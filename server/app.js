require('express-async-errors');
require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const UsersBookedSeatsRoutes = require('./routes/UsersBookedSeatsRoutes');
const connectDB = require('./db/connectDB')
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authenticationMiddleware')
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1', authMiddleware, moviesRoutes)
app.use('/api/v1/book-seats', authMiddleware, UsersBookedSeatsRoutes)
app.use(errorHandlerMiddleware)
app.use(notFound)

app.listen(process.env.PORT || 3000, async () => {
    try {
        await connectDB()
        console.log("Server running on port 3000")
    } catch (e) {
        console.log(e)
    }

})