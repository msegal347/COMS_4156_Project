import { requestController } from "../../src/controllers/requestController"
import Request from "../../src/models/requestModel";
import requestService from "../../src/services/requestService";

import { mockRequest, mockResponse, mockNext } from '../../src/utils/expressMock';

// Mocking the Request model methods
jest.mock('../../src/models/requestModel');

describe('RequestController', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    req.params = {};

    // Reset all mock behaviors
    jest.clearAllMocks();
  });

  it('should create a new request', async () => {
    const mockData = { materialId: 'materialId', quantity: 1, fulfulled: false, remainingQuantity: 2};
    const mockResult = { materialId: 'materialId', quantity: 1, fulfulled: false, remainingQuantity: 2, save: jest.fn()};
    // Mock the ResourceModel constructor to return an instance with a mock save method
    (Request as jest.MockedClass<typeof Request>).mockImplementation(() => {
      return mockResult as any;
    });

    await requestController.createRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });
});