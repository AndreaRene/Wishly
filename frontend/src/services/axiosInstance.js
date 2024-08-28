import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('Attempting to refresh token with:', refreshToken);

        const response = await axios.post('/api/token/refresh/', {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;

        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        // Retry the original request with the new access token
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${access}`;
        originalRequest.headers['Authorization'] = `Bearer ${access}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
