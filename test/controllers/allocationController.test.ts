import { Request, Response } from 'express';
import * as allocationController from '../../src/controllers/allocationController';
import * as allocationService from '../../src/services/allocationService'; 

// Mock the service layer
jest.mock('../../src/services/allocationService');

describe('Allocation Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let response: Response;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    response = mockResponse as unknown as Response;

    // Mock the service layer
    (allocationService.createAllocation as jest.Mock).mockResolvedValue({ message: 'Allocation created' });
    (allocationService.getAllocationById as jest.Mock).mockResolvedValue({ message: 'Allocation fetched' });
    (allocationService.updateAllocationById as jest.Mock).mockResolvedValue({ message: 'Allocation updated' });
    (allocationService.deleteAllocationById as jest.Mock).mockResolvedValue({ message: 'Allocation deleted' });
  });

  it('should create an allocation', async () => {
    // Provide all required fields
    mockRequest.body = { name: 'Resource1', resource: 'CPU', amount: 10 };
    await allocationController.createAllocation(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({ message: 'Allocation created' });
    expect(allocationService.createAllocation).toBeCalledWith(mockRequest.body);
  });
  
  it('should handle missing request body for createAllocation', async () => {
    mockRequest.body = {};
    await allocationController.createAllocation(mockRequest as Request, response);
    // Update the expected error message
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: 'Bad Request: Missing required fields' });
  });

  // Tests for getAllocationById
  it('should get an allocation by ID', async () => {
    mockRequest.params = { id: 'someId' };
    await allocationController.getAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ message: 'Allocation fetched' });
    expect(allocationService.getAllocationById).toBeCalledWith('someId');
  });

  it('should handle missing ID for getAllocationById', async () => {
    mockRequest.params = {};
    await allocationController.getAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: 'Bad Request: Missing ID parameter' });
  });

  // Tests for updateAllocationById
  it('should update an allocation by ID', async () => {
    mockRequest.params = { id: 'someId' };
    mockRequest.body = { name: 'Resource1', resource: 'CPU', amount: 10 };
    await allocationController.updateAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ message: 'Allocation updated' });
    expect(allocationService.updateAllocationById).toBeCalledWith('someId', mockRequest.body);
  });

  it('should handle missing ID or body for updateAllocationById', async () => {
    mockRequest.params = {};
    mockRequest.body = {};
    await allocationController.updateAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: 'Bad Request: Missing ID parameter' });
  });

  // Tests for deleteAllocationById
  it('should delete an allocation by ID', async () => {
    mockRequest.params = { id: 'someId' };
    await allocationController.deleteAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(204);
    expect(allocationService.deleteAllocationById).toBeCalledWith('someId');
  });

  it('should handle missing ID for deleteAllocationById', async () => {
    mockRequest.params = {};
    await allocationController.deleteAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: 'Bad Request: Missing ID parameter' });
  });

  // Tests for getAllAllocations
  it('should get all allocation', async () => {
    mockRequest.params = { id: 'someId' };
    await allocationController.getAllAllocations(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(200);
  });

  // Tests for triggerAllocations
  
    it('should call triggerAllocation', async () => {
    mockRequest.params = { id: 'someId' };
    const allocationResults = await allocationController.triggerAllocation(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ message: 'Allocation process completed',  allocationResults});
  });
});
