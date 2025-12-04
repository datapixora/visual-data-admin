import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://visual-data-api.onrender.com';

export const api = axios.create({
  baseURL: `${API_URL}/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    // API returns: { success, message, data: { user, accessToken, refreshToken } }
    return response.data.data; // Return the nested data object
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Campaigns API
export const campaignsApi = {
  getAll: async () => {
    const response = await api.get('/campaigns');
    return response.data.data || response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data.data || response.data;
  },

  create: async (data: any) => {
    const response = await api.post('/campaigns', data);
    return response.data.data || response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.patch(`/campaigns/${id}`, data);
    return response.data.data || response.data;
  },
};

// Uploads API
export const uploadsApi = {
  getPending: async () => {
    const response = await api.get('/uploads/admin/pending');
    return response.data.data || response.data;
  },

  getAll: async (params?: { status?: string; page?: number; limit?: number }) => {
    const response = await api.get('/uploads/admin/all', { params });
    return response.data.data || response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/uploads/${id}`);
    return response.data.data || response.data;
  },

  approve: async (id: string, data?: { qualityScore?: number; bonusAmount?: number }) => {
    const response = await api.post(`/uploads/${id}/approve`, data);
    return response.data.data || response.data;
  },

  reject: async (id: string, data: { reason: string }) => {
    const response = await api.post(`/uploads/${id}/reject`, data);
    return response.data.data || response.data;
  },
};

// Users API (admin endpoints would need to be added to backend)
export const usersApi = {
  getAll: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};
