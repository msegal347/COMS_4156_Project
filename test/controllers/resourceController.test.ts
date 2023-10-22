import { resourceController } from '../../src/controllers/resourceController';
import { resourceService } from '../../src/services/resourceService';

import { mockRequest, mockResponse, mockNext } from '../../src/utils/expressMock';

// Mock the resource service
jest.mock('../../src/services/resourceService');

describe('ResourceController', () => {
  let req, res, next;

  beforeEach(() => {
    // Initialize request, response, and next functions
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    req.params = {};
  });

  it('should create a new resource', async () => {
    const newResource = { name: 'Test Resource', type: 'Test Type' };

    // Mock the createResource function in the resourceService
    (resourceService.createResource as jest.Mock).mockResolvedValue(newResource);

    // Call the createResource function in the controller
    await resourceController.createResource(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newResource);
  });

  it('should retrieve all resources', async () => {
    const resources = [
      { name: 'Resource 1', type: 'Type A' },
      { name: 'Resource 2', type: 'Type B' },
    ];

    // Mock the getResources function in the resourceService
    (resourceService.getResources as jest.Mock).mockResolvedValue(resources);

    // Call the getResources function in the controller
    await resourceController.getResources(req, res);

    // Assertions
    expect(resourceService.getResources).toHaveBeenCalled(); // Check if service method was called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(resources);
  });

  it('should retrieve a resource by ID', async () => {
    const resourceId = '1';
    const resource = { _id: resourceId, name: 'Test Resource', type: 'Test Type' };

    // Mock the getResourceById function in the resourceService
    (resourceService.getResourceById as jest.Mock).mockResolvedValue(resource);

    // Initialize params if it is undefined
    req.params = req.params || {};
    req.params.id = resourceId;

    // Call the getResourceById function in the controller
    await resourceController.getResourceById(req, res);

    // Assertions
    expect(resourceService.getResourceById).toHaveBeenCalled(); // Check if service method was called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(resource);
  });

  it('should update a resource by ID', async () => {
    const resourceId = '1';
    const updatedResource = { _id: resourceId, name: 'Updated Resource', type: 'Test Type' };

    // Mock the updateResource function in the resourceService
    (resourceService.updateResource as jest.Mock).mockResolvedValue(updatedResource);

    req.params.id = resourceId; // Set the ID

    // Call the updateResource function in the controller
    await resourceController.updateResource(req, res);

    // Assertions
    expect(resourceService.updateResource).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedResource);
  });

  it('should delete a resource by ID', async () => {
    const resourceId = '1';

    // Mock the deleteResource function in the resourceService
    (resourceService.deleteResource as jest.Mock).mockResolvedValue(true);

    req.params.id = resourceId; // Set the ID

    // Call the deleteResource function in the controller
    await resourceController.deleteResource(req, res);

    // Assertions
    expect(resourceService.deleteResource).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({});
  });
});
