// test/services/logisticsService.test.ts

import * as GoogleMaps from '../../src/utils/googleMaps';
import * as LogisticsService from '../../src/services/logisticsService';

jest.mock('../../src/utils/googleMaps');

describe('LogisticsService', () => {
    it('should call GoogleMaps.getOptimalRoute and return the result', async () => {
        const mockOrigin = 'Origin Address';
        const mockDestinations = ['Destination 1', 'Destination 2'];
        const mockResult = ['Optimal Route Data'];

        (GoogleMaps.getOptimalRoute as jest.MockedFunction<typeof GoogleMaps.getOptimalRoute>).mockResolvedValue(mockResult);

        const result = await LogisticsService.calculateOptimalRoute(mockOrigin, mockDestinations);

        expect(result).toEqual(mockResult);
        expect(GoogleMaps.getOptimalRoute).toHaveBeenCalledWith(mockOrigin, mockDestinations);
    });
});
