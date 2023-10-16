// Import only for type information and mocking
import * as AnalyticsService from '../../src/services/analyticsService';

describe('AnalyticsService', () => {
  it('should call AnalyticsService.createRecord and return the result', async () => {
    // Mock data
    const mockData = 'data';
    const mockResult = ['data'];

    // Perform test
    const result = await AnalyticsService.createRecord({ data: mockData });

    // Assertions
    expect(result).toEqual(mockResult);
  });
});
