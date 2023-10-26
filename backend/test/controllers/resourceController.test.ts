import { resourceController } from '../../src/controllers/resourceController';
import { resourceService } from '../../src/services/resourceService';
import Resource from '../../src/models/resourceModel';

import { mockRequest, mockResponse, mockNext } from '../../src/utils/expressMock';

// Mock the Resource model
jest.mock('../../src/models/resourceModel');

describe('ResourceController', () => {
  let req, res, next;

  beforeEach(() => {
    // Initialize request, response, and next functions
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    req.params = {};

    // Clear all mocks
    jest.clearAllMocks();
  });

  it('should create a new resource', async () => {
    const newResource = { name: 'Test Resource', type: 'Test Type' };

    req.body = newResource;
    (Resource.prototype.save as jest.Mock).mockResolvedValue(newResource);

    await resourceController.createResource(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newResource);
  });

  it('should retrieve all resources', async () => {
    const resources = [
      { name: 'Resource 1', type: 'Type A' },
      { name: 'Resource 2', type: 'Type B' },
    ];

    req.params.name = 'name';
    (Resource.find as jest.Mock).mockResolvedValue(resources);

    await resourceController.getResources(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(resources);
  });

  it('should retrieve a resource by ID', async () => {
    const resourceId = '1';
    const resource = { name: 'Test Resource', type: 'Test Type' };

    req.params.id = resourceId;
    (Resource.findById as jest.Mock).mockResolvedValue(resource);

    await resourceController.getResourceById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(resource);
  });

  it('should update a resource by ID', async () => {
    const resourceId = '1';
    const updatedResource = { name: 'Updated Resource', type: 'Test Type' };

    req.params.id = resourceId;
    req.body = updatedResource;
    (Resource.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedResource);

    await resourceController.updateResource(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedResource);
  });

  it('should delete a resource by ID', async () => {
    const resourceId = '1';

    req.params.id = resourceId;
    (Resource.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

    await resourceController.deleteResource(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: 'Resource deleted' });
  });
});
