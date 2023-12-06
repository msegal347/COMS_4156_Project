import axios from 'axios';

const API_BASE_URL = 'http://34.145.209.212:5000/api';
//const API_BASE_URL = 'http://localhost:5000/api';

const createEndpoint = path => `${API_BASE_URL}${path}`;

// Auth functions
export const loginUser = credentials => axios.post(createEndpoint('/login'), credentials);
export const registerUser = userData => axios.post(createEndpoint('/registration'), userData);

// Resource management
export const getResources = () => axios.get(createEndpoint('/resources'));
export const createResource = resourceData =>
  axios.post(createEndpoint('/resources'), resourceData);
export const updateResource = (resourceId, resourceData) =>
  axios.put(createEndpoint(`/resources/${resourceId}`), resourceData);
export const deleteResource = resourceId =>
  axios.delete(createEndpoint(`/resources/${resourceId}`));

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
export const getUsers = () => axios.get(createEndpoint('/users'));
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  return axios.get(createEndpoint('/users/current'), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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
  getAuditLogs,
  getAnalytics,
};

export default api;
