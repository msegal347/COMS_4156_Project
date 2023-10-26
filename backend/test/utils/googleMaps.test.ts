import { getCoordinates, getOptimalRoute } from '../../src/utils/googleMaps';
import * as https from 'https';

// Mock the https module
jest.mock('https', () => ({
  get: jest.fn()
}));

describe('Google Maps Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should convert address to coordinates', async () => {
    const mockResponse = {
      on: (event, callback) => {
        if (event === 'data') {
          callback(JSON.stringify({ results: [{ geometry: { location: { lat: 40.7128, lng: -74.0060 } } }] }));
        } else if (event === 'end') {
          callback();
        }
      }
    };

    (https.get as jest.Mock).mockImplementation((url, callback) => {
      callback(mockResponse);
      return {} as any;
    });

    const coordinates = await getCoordinates('New York, NY');
    expect(coordinates).toEqual({ latitude: 40.7128, longitude: -74.0060 });
  });

  it('should calculate the optimal route', async () => {
    const mockResponse = {
      on: (event, callback) => {
        if (event === 'data') {
          callback(JSON.stringify({ routes: [{ waypoint_order: [1, 0, 2] }] }));
        } else if (event === 'end') {
          callback();
        }
      }
    };

    (https.get as jest.Mock).mockImplementation((url, callback) => {
      callback(mockResponse);
      return {} as any;
    });

    const route = await getOptimalRoute('Point A', ['Point B', 'Point C', 'Point D']);
    expect(route).toEqual(['Point C', 'Point B', 'Point D']);
  });
});

