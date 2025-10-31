import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/auth/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Get current user
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'me', config);
  return response.data;
};

// Update user details
const updateDetails = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + 'updatedetails', userData, config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  getMe,
  updateDetails,
  logout,
};

export default authService;
