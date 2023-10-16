// Test file for gateway.ts
import { initializeGateway } from '../../src/gateway/gateway';
import express from 'express';

// Mock controllers
const mockCreateRoute = jest.fn();
const mockGetRouteById = jest.fn();
const mockUpdateRouteById = jest.fn();
const mockDeleteRouteById = jest.fn();
const mockGetOptimalRoute = jest.fn();
const mockGetCoordinates = jest.fn();

// Mock Express app
const mockApp = {
  use: jest.fn()
} as unknown as express.Express;

describe('API Gateway', () => {
  it('should initialize routes correctly', () => {
    // Call the initializeGateway function
    initializeGateway(mockApp);

    // Verify that the routes have been initialized correctly
    expect(mockApp.use).toHaveBeenCalledWith('/api/logistics', expect.anything());
  });
});
