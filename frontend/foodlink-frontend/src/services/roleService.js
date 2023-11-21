import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Update with your actual API URL

export const getRoles = async () => {
  const response = await axios.get(`${API_URL}/roles`);
  return response.data;
};
