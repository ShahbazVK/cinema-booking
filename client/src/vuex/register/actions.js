import axios from "axios";
import baseURL from '../../assets/baseURL'

export default {
    async register(context, payload) {
        try {
            const resp = await axios.post(baseURL("/auth/register"), {
                ...payload
            });
            // console.log(resp)
            return resp
        } catch (e) {
            console.log(e)
        }
    },
};