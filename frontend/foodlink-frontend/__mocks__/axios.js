// __mocks__/axios.js

const mockAxios = jest.createMockFromModule('axios');

// Mock the get method
mockAxios.get.mockResolvedValue({ data: {} });

export default mockAxios;
