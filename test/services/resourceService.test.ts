import { resourceService } from '../../src/services/resourceService';
import ResourceModel, { IResource } from '../../src/models/resourceModel';

// Mock the ResourceModel class
jest.mock('../../src/models/resourceModel');

describe('ResourceService', () => {
  it('should call ResourceService.createResource and return the result', async () => {
    // Mock data and result
    const mockData = { name: 'Test Resource', type: 'Test Type' };
    const mockResult = { name: 'Test Resource', type: 'Test Type', save: jest.fn() };

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
});
