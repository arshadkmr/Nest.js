import { axiosInstanceUser } from "../config/baseURL";



export const register = async (name, email, password) => {
    try {
        const response = await axiosInstanceUser.post('/register', { name, email, password })
        return response
    } catch (error) {
        return error.response
    }
}

export const login = async (email, password) => {
    try {
        const response = await axiosInstanceUser.post('/login', { email, password })
        localStorage.setItem("todoUser", JSON.stringify(response.data));
        return response
    } catch (error) {
        return error.response
    }
}

export const insertTask = async (task) => {
    try {
        const response = await axiosInstanceUser.post('/task', { task })
        return response
    } catch (error) {
        return error.response
    }
}

export const getTask = async () => {
    try {
        const response = await axiosInstanceUser.get('/task')
        return response
    } catch (error) {
        return error.response
    }
}

export const updateTask = async (id) => {
    try {
        const response = await axiosInstanceUser.patch('/task', { id })
        return response
    } catch (error) {
        return error.response
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await axiosInstanceUser.delete(`/task/${id}`,)
        return response
    } catch (error) {
        return error.response
    }
}