import axios from 'axios'
import baseURL from '../../assets/baseURL'

export default {
    async login(context, payload) {
        try {
            const resp = await axios.post(baseURL("/auth/login"), {
                ...payload
            })
            console.log(resp)
            localStorage.setItem("token", resp.data.token)
            localStorage.setItem("userId", resp.data.userId)
            return resp
        } catch (e) {
            console.log(e)
        }
    }
}