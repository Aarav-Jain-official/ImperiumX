import axios from 'axios';

// 1. Create the instance
const api = axios.create({
  // The base URL for all requests
  baseURL: 'https://gear-guard-server.onrender.com/api/v1',
  withCredentials: true, 
  
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Response Interceptor (Optional but recommended)
// This handles errors globally so you don't have to repeat try/catch logic everywhere
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the server returns 401 (Unauthorized), it means the session expired
    if (error.response && error.response.status === 401) {
       console.error('Session expired. Redirecting to login...');
       // window.location.href = '/login'; // Optional: Auto-redirect
    }
    return Promise.reject(error);
  }
);

export default api;