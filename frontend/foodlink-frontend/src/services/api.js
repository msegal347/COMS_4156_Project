import axios from 'axios';

const API_BASE_URL = 'http://35.245.182.19:3000';

const createEndpoint = (path) => `${API_BASE_URL}${path}`;

// Auth functions
export const loginUser = (credentials) => axios.post(createEndpoint('/login'), credentials);
export const registerUser = (userData) => axios.post(createEndpoint('/registration'), userData);

// Resource management
export const getResources = () => axios.get(createEndpoint('/resources'));
export const createResource = (resourceData) => axios.post(createEndpoint('/resources'), resourceData);
export const updateResource = (resourceId, resourceData) => axios.put(createEndpoint(`/resources/${resourceId}`), resourceData);
export const deleteResource = (resourceId) => axios.delete(createEndpoint(`/resources/${resourceId}`));

// Allocation management
export const getAllocations = () => axios.get(createEndpoint('/allocations'));
export const createAllocation = (allocationData) => axios.post(createEndpoint('/allocations'), allocationData);
export const getAllocationById = (allocationId) => axios.get(createEndpoint(`/allocations/${allocationId}`));
export const updateAllocation = (allocationId, allocationData) => axios.put(createEndpoint(`/allocations/${allocationId}`), allocationData);
export const deleteAllocation = (allocationId) => axios.delete(createEndpoint(`/allocations/${allocationId}`));

// Transaction management
export const getTransactions = () => axios.get(createEndpoint('/transactions'));
export const getRecentTransactions = () => axios.get(createEndpoint('/transactions/recent'));
export const submitRequest = (request) => axios.post(createEndpoint('/requests'), request);

// User management
export const getUsers = () => axios.get(createEndpoint('/users'));

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
  createAllocation,
  getAllocationById,
  updateAllocation,
  deleteAllocation,
  getTransactions,
  getRecentTransactions,
  submitRequest,
  getUsers,
  getAuditLogs,
  getAnalytics,
};

export default api;
