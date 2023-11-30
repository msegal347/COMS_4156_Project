import {resourceService} from '../../src/services/resourceService';
import ResourceModel from '../../src/models/resourceModel';
import Resource from '../../src/models/resourceModel';

// Mock the ResourceModel class
jest.mock('../../src/models/resourceModel');

describe('ResourceService', () => {
  it('should call ResourceService.createResource and return the result', async () => {
    // Mock data and result
    const mockData = { category: 'Test Resource', quantity: 1 };
    const mockResult = { category: 'Test Resource', quantity: 1, save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    // Mock the ResourceModel constructor to return an instance with a mock save method
    (ResourceModel as jest.MockedClass<typeof ResourceModel>).mockImplementation(() => {
      return mockResult as any;
    });

    // Perform the test
    const result = await resourceService.createResource(mockData);

    // Assertions
    expect(result).toEqual(mockResult);
  });

  // Should get all resources
  it('should get all resources', async () => {
    // Mock data and result
    const mockData = { category: 'Test Resource', quantity: 1 };
    const mockResult = { category: 'Test Resource', quantity: 1, save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    Resource.find = jest.fn().mockResolvedValue(mockData);

    const result = await resourceService.getResources();

    expect(result).toEqual(mockData);
  });

  // Should get an resource by ID
  it('should get an resource by ID', async () => {
    // Mock data and result
    const mockData = { category: 'Test Resource', quantity: 1 };
    const mockResult = { category: 'Test Resource', quantity: 1, save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    Resource.findById = jest.fn().mockResolvedValue(mockData);

    const result = await resourceService.getResourceById('1');

    expect(result).toEqual(mockData);
  });

  // Should update an resource by ID
  it('should update an resource by ID', async () => {
    // Mock data and result
    const mockData = { name: 'Test Resource', type: 'Test Type' };
    const mockResult = { name: 'Test Resource', type: 'Test Type', save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    Resource.findByIdAndUpdate = jest.fn().mockResolvedValue(mockData);

    const result = await resourceService.updateResource('1', mockData);

    expect(result).toEqual(mockData);
  });

  // Should delete an resource by ID
  it('should delete an resource by ID', async () => {
    Resource.findByIdAndDelete = jest.fn().mockResolvedValue(true);

    const result = await resourceService.deleteResource('1');

    expect(result).toBeTruthy();
  });

});
