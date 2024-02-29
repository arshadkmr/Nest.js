import axios from 'axios'

export const axiosInstanceUser = axios.create({
    baseURL: 'http://localhost:5000'
})

const getToken = () => {
    const userInfo = localStorage.getItem('todoUser')
        ? JSON.parse(localStorage.getItem('todoUser'))
        : null
    return userInfo
}

axiosInstanceUser.interceptors.request.use((config) => {
    const userInfo = getToken()
    config.headers.Authorization = `Bearer ${userInfo?.token}`
    return config
})