require('dotenv').config()
const Movies = require('./models/Movies');
const currentMoviesJson=require('./data/currentMoviesData.json')
const upcomingMoviesJson=require('./data/upcomingMoviesData.json')
const connectDB=require('./db/connectDB');

const addMovies = async () => {
    await connectDB(process.env.MONGO_URI)

    await Movies.create( currentMoviesJson )
    await Movies.create( upcomingMoviesJson )
    console.log("success")
}
addMovies()