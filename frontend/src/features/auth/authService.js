import axios from 'axios'
const API_URL = 'https://goalsapp-backend.vercel.app/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(response.data)
    }
    return response.data
}
const login = async (userData) => {
    const response = await axios.post(API_URL+"login", userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        console.log(response.data)
    }
    return response.data
}
const logout = async () => {
    localStorage.removeItem('user')
}
const authService = {
    register,
    login,
    logout
}
export default authService