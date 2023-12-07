import axios from 'axios';

const API_BASE_URL = 'http://34.145.209.212:5000/api';
//const API_BASE_URL = 'http://localhost:5000/api';

const userCache = {};

const createEndpoint = path => `${API_BASE_URL}${path}`;

// Auth functions
export const loginUser = credentials => {
  console.log("API loginUser called with credentials:", credentials);
  return axios.post(createEndpoint('/users/login'), credentials); // Updated endpoint
};

export const registerUser = userData => {
  return axios.post(createEndpoint('/users/registration'), userData); // Updated endpoint
};

// Resource management
export const getResources = () => axios.get(createEndpoint('/resources'));

export const createResource = async (resourceData) => {
  const { categoryId, quantity, userId } = resourceData; // Destructure the data
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const data = { categoryId, quantity, userId }; // Construct the data in the expected format
  console.log('Sending request with data:', data);

  return axios.post(`${API_BASE_URL}/resources`, data, config);
};




export const updateResource = (resourceId, resourceData) =>
  axios.put(createEndpoint(`/resources/${resourceId}`), resourceData);

export const deleteResource = resourceId =>
  axios.delete(createEndpoint(`/resources/${resourceId}`));

export const getResourceCategoryById = categoryId => {
  console.log("API getResourceCategoryById called for categoryId:", categoryId);
  return axios.get(createEndpoint(`/resourceCategories/${categoryId}`));
};

// Allocation management
export const getAllocations = () => axios.get(createEndpoint('/allocations'));

export const getAllocationById = allocationId =>
  axios.get(createEndpoint(`/allocations/${allocationId}`));

export const updateAllocation = (allocationId, allocationData) =>
  axios.put(createEndpoint(`/allocations/${allocationId}`), allocationData);

export const deleteAllocation = allocationId =>
  axios.delete(createEndpoint(`/allocations/${allocationId}`));

export const triggerAllocationProcess = () =>
  axios.post(createEndpoint('/allocations/trigger-allocation'));

// Transaction management
export const getTransactions = () => axios.get(createEndpoint('/transactions'));

export const getRecentTransactions = () => axios.get(createEndpoint('/transactions/recent'));

export const submitRequest = materials => {
  return axios.post(createEndpoint('/requests'), { materials });
};

// User management
export const getUserById = async userId => {
  console.log("API getUserById called for userId:", userId);

  if (userCache[userId]) {
    return { data: userCache[userId] };  // Return cached data
  }

  try {
    const response = await axios.get(createEndpoint(`/users/${userId}`)); // Updated endpoint
    userCache[userId] = response.data;  // Cache the user data
    return response;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    if (error.response && error.response.status === 404) {
      console.warn(`User with ID ${userId} not found.`);
      userCache[userId] = null;  // Cache the null response
    }
    throw error;
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  return axios.get(createEndpoint('/users/current'), { 
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getUsers = () => {
  return axios.get(createEndpoint('/users'));
};

// Audit and analytics
export const getAuditLogs = () => axios.get(createEndpoint('/audit-logs'));

export const getAnalytics = () => axios.get(createEndpoint('/analytics'));

const api = {
  loginUser,
  registerUser,
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getAllocations,
  getAllocationById,
  updateAllocation,
  deleteAllocation,
  triggerAllocationProcess,
  getTransactions,
  getRecentTransactions,
  submitRequest,
  getUsers,
  getUserById,
  getCurrentUser,
  getAuditLogs,
  getAnalytics,
};

export default api;
