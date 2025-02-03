import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your NestJS backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;