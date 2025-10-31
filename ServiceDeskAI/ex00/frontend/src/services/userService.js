import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/users/';

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getUsers = async (token) => {
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

const createUser = async (userData, token) => {
  const response = await axios.post(API_URL, userData, getConfig(token));
  return response.data;
};

const updateUser = async (id, data, token) => {
  const response = await axios.put(API_URL + id, data, getConfig(token));
  return response.data;
};

const deleteUser = async (id, token) => {
  const response = await axios.delete(API_URL + id, getConfig(token));
  return response.data;
};

const uploadPhoto = async (file, token) => {
  const formData = new FormData();
  formData.append('photo', file);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.put(API_URL + 'photo', formData, config);
  return response.data;
};

const userService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  uploadPhoto,
};

export default userService;
