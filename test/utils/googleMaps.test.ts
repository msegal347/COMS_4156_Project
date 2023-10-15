import { getCoordinates, getOptimalRoute } from '../../src/utils/googleMaps';

// Mock axios for testing
jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('Google Maps Utilities', () => {
  it('should convert address to coordinates', async () => {
    // Mock the API response
    require('axios').get.mockResolvedValue({
      data: {
        results: [
          {
            geometry: {
              location: {
                lat: 40.7128,
                lng: -74.0060,
              },
            },
          },
        ],
      },
    });

    const coordinates = await getCoordinates('New York, NY');
    expect(coordinates).toEqual({ latitude: 40.7128, longitude: -74.0060 });
  });

  it('should calculate the optimal route', async () => {
    // Mock the API response
    require('axios').get.mockResolvedValue({
      data: {
        routes: [
          {
            waypoint_order: [1, 0, 2],
          },
        ],
      },
    });

    const route = await getOptimalRoute('Point A', ['Point B', 'Point C', 'Point D']);
    expect(route).toEqual(['Point C', 'Point B', 'Point D']);
  });
});
