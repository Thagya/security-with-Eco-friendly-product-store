import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth0_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth0_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;

// API functions
export const userAPI = {
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (data) => api.put('/api/user/profile', data),
};

export const orderAPI = {
  create: (data) => api.post('/api/orders', data),
  getAll: () => api.get('/api/orders'),
  getById: (id) => api.get(`/api/orders/${id}`),
  update: (id, data) => api.put(`/api/orders/${id}`, data),
  cancel: (id) => api.delete(`/api/orders/${id}`),
};

export const productAPI = {
  getAll: () => api.get('/api/products'),
  getDistricts: () => api.get('/api/districts'),
};
