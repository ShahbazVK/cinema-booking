import {
    createStore
} from "vuex";
import movies from './movies'
import register from './register'
import login from "./login";

export default createStore({
    modules: {
        movies,
        register,
        login,
    }
})