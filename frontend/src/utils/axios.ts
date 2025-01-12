import axios from 'axios'

// create an axios instance and handling axios base url for localhost 5000
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials : true // send cookies in every request to the server
})