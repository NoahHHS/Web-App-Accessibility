import axios from 'axios';

const apiClient = axios.create({
  // Base URL or other global settings
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('JWT_access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('JWT_access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
