// Import only for type information and mocking
import * as AnalyticsService from '../../src/services/analyticsService';

describe('AnalyticsService', () => {
  it('should call AnalyticsService.createRecord and AnalyticsService.getRecordById and return the result', async () => {
    // Mock data
    const mockData = 'data';
    const mockResult = ['data'];

    // Perform test
    await AnalyticsService.createRecord(mockData);
    const result = await AnalyticsService.getRecordById('1');

    // Assertions
    expect(result).toEqual(mockResult);
  });
});
