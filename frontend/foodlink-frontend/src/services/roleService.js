import axios from 'axios';

const API_URL = 'http://34.48.4.68:5000/api';

export const getRoles = async () => {
  const response = await axios.get(`${API_URL}/roles`);
  if (response.data) {
    return response.data;
  } else {
    throw new Error('No roles data');
  }
};
