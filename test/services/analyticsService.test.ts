import * as AnalyticsService from '../../src/services/analyticsService';
import AnalyticsModel from '../../src/models/analyticsModel';

// Mock the AnalyticsModel class
jest.mock('../../src/models/analyticsModel');

describe('AnalyticsService', () => {
  it('should call AnalyticsService.createRecord and return the result', async () => {
    // Mock data and result
    const mockData = { data: 'data' };
    const mockResult = { data: 'data', save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    // Mock the AnalyticsModel constructor to return an instance with a mock save method
    (AnalyticsModel as jest.MockedClass<typeof AnalyticsModel>).mockImplementation(() => {
      return mockResult as any;
    });

    // Perform the test
    const result = await AnalyticsService.createRecord(mockData);

    // Assertions
    expect(result).toEqual(mockResult);
  });
});

