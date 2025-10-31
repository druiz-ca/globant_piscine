import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/tickets/';

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get all tickets
const getTickets = async (filters, token) => {
  const queryString = filters ? '?' + new URLSearchParams(filters).toString() : '';
  const response = await axios.get(API_URL + queryString, getConfig(token));
  return response.data;
};

// Get single ticket
const getTicket = async (id, token) => {
  const response = await axios.get(API_URL + id, getConfig(token));
  return response.data;
};

// Create ticket
const createTicket = async (ticketData, token) => {
  const formData = new FormData();
  
  Object.keys(ticketData).forEach(key => {
    if (key === 'media' && ticketData[key]) {
      for (let i = 0; i < ticketData[key].length; i++) {
        formData.append('media', ticketData[key][i]);
      }
    } else if (key === 'location' && ticketData[key]) {
      formData.append(key, JSON.stringify(ticketData[key]));
    } else {
      formData.append(key, ticketData[key]);
    }
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

// Update ticket
const updateTicket = async (id, data, token) => {
  const response = await axios.put(API_URL + id, data, getConfig(token));
  return response.data;
};

// Delete ticket
const deleteTicket = async (id, token) => {
  const response = await axios.delete(API_URL + id, getConfig(token));
  return response.data;
};

// Add message to ticket
const addMessage = async (id, message, token) => {
  const response = await axios.post(API_URL + id + '/messages', { message }, getConfig(token));
  return response.data;
};

// Get statistics
const getStatistics = async (token) => {
  const response = await axios.get(API_URL + 'stats', getConfig(token));
  return response.data;
};

// Analyze image
const analyzeImage = async (id, token) => {
  const response = await axios.post(API_URL + id + '/analyze-image', {}, getConfig(token));
  return response.data;
};

const ticketService = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  addMessage,
  getStatistics,
  analyzeImage,
};

export default ticketService;
