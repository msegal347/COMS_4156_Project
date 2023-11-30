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


export const getOptimalRoute = async (
  origin: string,
  destinations: string[],
  apiKey: string
): Promise<string[]> => {
  try {
    console.log(`Fetching optimal route from ${origin} to`, destinations);

    const originStr = `origin=${encodeURIComponent(origin)}`;
    const destinationStr = `destination=${encodeURIComponent(destinations.pop() || '')}`;
    const waypointsStr = `waypoints=optimize:true|${destinations
      .map(encodeURIComponent)
      .join('|')}`;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?${originStr}&${destinationStr}&${waypointsStr}&key=${apiKey}`
    );

    console.log(`Received response:`, response.data);

    if (response.data.status === 'OK') {
      const route = response.data.routes[0].waypoint_order.map(
        (index: number) => destinations[index]
      );
      console.log(`Optimal route found:`, route);
      return route;
    } else {
      console.error(`API Error: ${response.data.error_message}`);
      throw new Error(response.data.error_message || 'Failed to get the optimal route');
    }
  } catch (error) {
    console.error('Error during route optimization process:', error);
    throw new Error('An error occurred during the route optimization process');
  }
};