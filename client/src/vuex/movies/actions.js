import { currentMoviesData } from "../../assets/currentMoviesData"
import { upcomingMoviesData } from '../../assets/upcomingMoviesData'

export default {
    setCurrentMoviesData(context) {
        try {
            context.commit('setCurrentMoviesData', currentMoviesData)
            // return "Hi"
        }
        catch (e) {
            console.log(e);
        }
    },
    setUpcomingMoviesData(context) {
        try {
            context.commit('setUpcomingMoviesData', upcomingMoviesData)
        }
        catch (e) {
            console.log(e);
        }
    },
}