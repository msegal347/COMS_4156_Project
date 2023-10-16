// Import axios for mocking
import axios from 'axios';
import * as LogisticsService from '../../src/services/logisticsService';
import * as GoogleMaps from '../../src/utils/googleMaps';

// Mock Axios and GoogleMaps
jest.mock('axios');
jest.mock('../../src/utils/googleMaps');

describe('LogisticsService', () => {
  it('should call GoogleMaps.getOptimalRoute and return the result', async () => {
    const mockOrigin = 'Origin Address';
    const mockDestinations = ['Destination 1', 'Destination 2'];
    const mockResult = ['Optimal Route Data'];

    // Mock Axios response
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: 'some data',
    });

    // Mock GoogleMaps.getOptimalRoute function
    (GoogleMaps.getOptimalRoute as jest.MockedFunction<typeof GoogleMaps.getOptimalRoute>).mockResolvedValue(mockResult);

    // Perform test
    const result = await LogisticsService.calculateOptimalRoute(mockOrigin, mockDestinations);

    // Assertions
    expect(result).toEqual(mockResult);
    expect(GoogleMaps.getOptimalRoute).toHaveBeenCalledWith(mockOrigin, mockDestinations);
  });
});
