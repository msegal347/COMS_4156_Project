// Import only for type information and mocking
import * as LogisticsService from '../../src/services/logisticsService';
import * as GoogleMaps from '../../src/utils/googleMaps';

// Mock Axios indirectly and also mock GoogleMaps
jest.mock('axios');  // This mocks axios without importing it
jest.mock('../../src/utils/googleMaps');

describe('LogisticsService', () => {
  it('should call GoogleMaps.getOptimalRoute and return the result', async () => {
    // Mock data
    const mockOrigin = 'Origin Address';
    const mockDestinations = ['Destination 1', 'Destination 2'];
    const mockResult = ['Optimal Route Data'];

    // Mock GoogleMaps.getOptimalRoute function
    (GoogleMaps.getOptimalRoute as jest.MockedFunction<typeof GoogleMaps.getOptimalRoute>).mockResolvedValue(mockResult);

    // Perform test
    const result = await LogisticsService.calculateOptimalRoute(mockOrigin, mockDestinations);

    // Assertions
    expect(result).toEqual(mockResult);
    expect(GoogleMaps.getOptimalRoute).toHaveBeenCalledWith(mockOrigin, mockDestinations);
    expect(GoogleMaps.getOptimalRoute).toHaveBeenCalledTimes(1);
  });
});
