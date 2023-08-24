require('express-async-errors');
require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/connectDB')
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

const app = express()

app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use(errorHandlerMiddleware)
app.use(notFound)

app.listen(process.env.PORT || 3000, async () => {
    try {
        await connectDB()
        console.log("Server running on port 3000")
    }
    catch (e) {
        console.log(e)
    }

})