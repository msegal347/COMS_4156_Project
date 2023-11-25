import { get } from 'https';
import { URL } from 'url';
import axios from 'axios';

// Get the coordinates of an address
export const getCoordinates = async (
  address: string
): Promise<{ latitude: number; longitude: number }> => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    } else {
      throw new Error(response.data.error_message || 'Failed to get the coordinates');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('An error occurred during the geocoding process');
    }
  }
};

// Get the optimal route between an origin and a list of destinations
export const getOptimalRoute = async (
  origin: string,
  destinations: string[]
): Promise<string[]> => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const originStr = `origin=${encodeURIComponent(origin)}`;
    const destinationStr = `destination=${encodeURIComponent(destinations.pop() || '')}`;
    const waypointsStr = `waypoints=optimize:true|${destinations.map(encodeURIComponent).join('|')}`;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?${originStr}&${destinationStr}&${waypointsStr}&key=${apiKey}`
    );

    if (response.data.status === 'OK') {
      const route = response.data.routes[0].waypoint_order.map((index: number) => destinations[index]);
      return route;
    } else {
      throw new Error(response.data.error_message || 'Failed to get the optimal route');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('An error occurred during the route optimization process');
    }
  }
};