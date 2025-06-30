import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

// Add a request interceptor to set the token from localStorage
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Adjust key if named differently
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
