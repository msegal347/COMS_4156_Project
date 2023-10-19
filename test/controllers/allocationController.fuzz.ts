import { Request, Response } from 'express';
import * as allocationController from '../../src/controllers/allocationController';
import "@jazzer.js/jest-runner/jest-extension";

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
  });

  it.fuzz('should create an allocation', async () => {
    await allocationController.createAllocation(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({ message: 'Allocation created' });
  });

  it.fuzz('should get an allocation by ID', async () => {
    await allocationController.getAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ message: 'Allocation fetched' });
  });

  
  it.fuzz('should update an allocation by ID', async () => {
    await allocationController.updateAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ message: 'Allocation updated' });
  });

  it.fuzz('should delete an allocation by ID', async () => {
    await allocationController.deleteAllocationById(mockRequest as Request, response);
    expect(response.status).toHaveBeenCalledWith(204);
    expect(response.json).toHaveBeenCalledWith();
  });
  
});
