import { getCoordinates} from '../../src/utils/googleMaps';

// Define the API key here for testing
const apiKey = 'AIzaSyBqUPau26I7Vzvj3roNeQ1qhFQMNBsCZ7Q';

describe('Google Maps Integration Tests', () => {
  it('should get correct coordinates for a known address', async () => {
    try {
      const address = '1600 Amphitheatre Parkway, Mountain View, CA';
      const expectedLat = 37.4223878;
      const expectedLng = -122.0841877;

      const coordinates = await getCoordinates(address, apiKey);
      console.log('Coordinates:', coordinates);

      expect(coordinates.latitude).toBeCloseTo(expectedLat, 4);
      expect(coordinates.longitude).toBeCloseTo(expectedLng, 4);
    } catch (error) {
      console.error('Error in getCoordinates:', error);
      throw error;
    }
  });

});
