import axios from 'axios';

const token = localStorage.getItem('accessToken');

const axiosInstance = axios.create({
    baseURL: `${process.env["VUE_APP_URL"]}`,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
