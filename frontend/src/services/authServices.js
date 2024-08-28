import axios from 'axios';

const API_URL = '/api'; // Replace with your actual API base URL

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register/`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login/`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
};

// Check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export { register, login, logout, isAuthenticated };
