const authHeader = () => {
    const token = localStorage.getItem("token")
    return {
        authorization: `Bearer ${token}`
    }
}
export default authHeader