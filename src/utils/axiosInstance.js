// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  // 'http://192.168.137.107:5000/api/v1'
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token in all requests
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;