// Import only for type information and mocking
import * as LogisticsService from '../../src/services/logisticsService';
import Logistics from '../../src/models/logisticsModel';
import * as GoogleMaps from '../../src/utils/googleMaps';

// Mock Axios indirectly and also mock GoogleMaps
jest.mock('axios');  // This mocks axios without importing it
jest.mock('../../src/utils/googleMaps');
jest.mock('../../src/models/logisticsModel');

describe('LogisticsService', () => {
  it('should call LogisticsService.createRoute and return the result', async () => {
    const mockOrigin= 'Origin Address';
    const mockDestinations = ['Destination 1', 'Destination 2'];
    const mockRoute = ['Optimal Route Data'];
    const mockData = {origin: mockOrigin, destination: mockDestinations, optimalRoute: mockRoute};
    const mockResult = {...mockData, save: jest.fn()};

    (Logistics as jest.MockedClass<typeof Logistics>).mockImplementation(() => {
      return mockResult as any;
    });
    mockResult.save.mockResolvedValueOnce(mockResult);
    
    const result = await LogisticsService.createRoute(mockData);

    expect(result).toEqual(mockResult);
    expect(result).toBeDefined();
  });

  // Should get an route by ID
  it('should get an route by ID', async () => {
    
    const mockOrigin= 'Origin Address';
    const mockDestinations = ['Destination 1', 'Destination 2'];
    const mockRoute = ['Optimal Route Data'];
    const mockData = {origin: mockOrigin, destination: mockDestinations, optimalRoute: mockRoute};

    Logistics.findById = jest.fn().mockResolvedValue(mockData);

    const result = await LogisticsService.getRouteById('1');

    expect(result).toEqual(mockData);
  });

  // Should update an route by ID
  it('should update an route by ID', async () => {
    const mockOrigin= 'Origin Address';
    const mockDestinations = ['Destination 1', 'Destination 2'];
    const mockRoute = ['Optimal Route Data'];
    const mockData = {origin: mockOrigin, destination: mockDestinations, optimalRoute: mockRoute};
    Logistics.findByIdAndUpdate = jest.fn().mockResolvedValue(mockData);

    const result = await LogisticsService.updateRouteById('1', mockData);

    expect(result).toEqual(mockData);
  });

  // Should delete an route by ID
  it('should delete an route by ID', async () => {
    Logistics.findByIdAndDelete = jest.fn().mockResolvedValue(true);

    const result = await LogisticsService.deleteRouteById('1');

    expect(result).toBeUndefined();
  });

  it('should call GoogleMaps.getOptimalRoute and return the result', async () => {
    // Mock data
    const mockOrigin = 'Origin Address';
    const mockDestinations = ['Destination 1', 'Destination 2'];
    const mockResult = ['Optimal Route Data'];
    const api = 'rwuy6434tgdgjhtiojiosi838tjue3'; //placeholder API

    // Mock GoogleMaps.getOptimalRoute function
    (GoogleMaps.getOptimalRoute as jest.MockedFunction<typeof GoogleMaps.getOptimalRoute>).mockResolvedValue(mockResult);

    // Perform test
    const result = await LogisticsService.calculateOptimalRoute(mockOrigin, mockDestinations, api);

    // Assertions
    expect(result).toEqual(mockResult);
    expect(GoogleMaps.getOptimalRoute).toHaveBeenCalledWith(mockOrigin, mockDestinations, api);
    expect(GoogleMaps.getOptimalRoute).toHaveBeenCalledTimes(1);
  });
});
