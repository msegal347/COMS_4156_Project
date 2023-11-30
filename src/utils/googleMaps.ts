import axios from 'axios';

export const getCoordinates = async (
  address: string,
  apiKey: string
): Promise<{ latitude: number; longitude: number }> => {
  try {
    console.log(`Fetching coordinates for address: ${address}`);
    console.log(`Using API Key: ${apiKey}`);

    console.log(encodeURIComponent(address));

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );

    console.log(`Received response:`, response.data);

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      console.log(`Location found:`, location);
      return { latitude: location.lat, longitude: location.lng };
    } else {
      console.error(`API Error: ${response.data.error_message}`);
      throw new Error(response.data.error_message || 'Failed to get the coordinates');
    }
  } catch (error) {
    console.error('Error during geocoding process:', error);
    throw new Error('An error occurred during the geocoding process');
  }
};
