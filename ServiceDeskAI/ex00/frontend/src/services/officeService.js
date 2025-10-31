import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/offices/';

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getOffices = async (token) => {
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

const getOffice = async (id, token) => {
  const response = await axios.get(API_URL + id, getConfig(token));
  return response.data;
};

const createOffice = async (officeData, token) => {
  const response = await axios.post(API_URL, officeData, getConfig(token));
  return response.data;
};

const updateOffice = async (id, data, token) => {
  const response = await axios.put(API_URL + id, data, getConfig(token));
  return response.data;
};

const deleteOffice = async (id, token) => {
  const response = await axios.delete(API_URL + id, getConfig(token));
  return response.data;
};

const officeService = {
  getOffices,
  getOffice,
  createOffice,
  updateOffice,
  deleteOffice,
};

export default officeService;
