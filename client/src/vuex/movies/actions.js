import axios from 'axios'
import baseURL from '../../assets/baseURL'
import authHeader from '../../assets/authHeader'
export default {
    async setCurrentMoviesData(context) {
        try {
            const resp = await axios.get(baseURL("/movies?isUpcoming=false"), {
                headers: authHeader()
            })
            context.commit('setCurrentMoviesData', resp.data.movies)
        } catch (e) {
            console.log(e);
        }
    },
    async setUpcomingMoviesData(context) {
        try {
            const resp = await axios.get(baseURL("/movies?isUpcoming=true"), {
                headers: {
                    ...authHeader()
                }
            })
            context.commit('setUpcomingMoviesData', resp.data.movies)
        } catch (e) {
            console.log(e);
        }
    },
    async specificMovieInfo(context, movie) {
        try {
            const resp = await axios.get(baseURL(`/seats?movie=${movie}`), {
                headers: authHeader()
            })
            return resp.data.movieInfo
        } catch (e) {
            console.log(e)
        }
    },
    async specificMovieSeats(context, movie) {
        try {
            const resp = await axios.get(baseURL(`/book-seats?userId=64e8acfe9c3454958d916c43`), {
                headers: authHeader()
            })
            return resp.data.bookedMovies
        } catch (e) {
            console.log(e)
        }
    },

    async bookSeats(context, {
        movie,
        seats
    }) {
        console.log(seats)
        console.log(movie)

        try {
            const resp = await axios.patch(baseURL(`/update-seats`), {
                movie,
                seats
            }, {
                headers: authHeader()
            })
            return resp
        } catch (e) {
            console.log(e)
        }
    },
}