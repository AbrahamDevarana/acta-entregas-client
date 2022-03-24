import axios from 'axios'

const clientAxios = axios.create({
    baseURL: process.env.REACT_APP_URL,
    // withCredentials: true
    // headers: {"Content-Type": "multipart/form-data"}
})

export default clientAxios