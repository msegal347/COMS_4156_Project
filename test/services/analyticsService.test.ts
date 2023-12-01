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

  it('should call AnalyticsService.getRecordById and return the result', async () => {
    // Mock data and result
    const mockData = { data: 'data' };
    const mockResult = { data: 'data', save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    AnalyticsModel.findById = jest.fn().mockResolvedValue(mockData);

    const result = await AnalyticsService.getRecordById('1');

    // Assertions
    expect(result).toEqual(mockData);
  });

  // Should update a record by ID
  it('should update a record by ID', async () => {
    const mockData = { data: 'data2' };
    const mockResult = { data: 'data2', save: jest.fn() };
    AnalyticsModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockData);

    const result = await AnalyticsService.updateRecordById('1', mockData);

    expect(result).toEqual(mockData);
  });

  // Should delete a record by ID
  it('should delete a record by ID', async () => {
    AnalyticsModel.findByIdAndDelete = jest.fn().mockResolvedValue(true);

    const result = await AnalyticsService.deleteRecordById('1');

    expect(result).toBeUndefined();
  });
});

