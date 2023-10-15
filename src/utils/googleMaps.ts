import axios from 'axios';

// Convert address to coordinates using Google Maps Geocoding API
export const getCoordinates = async (address: string): Promise<{ latitude: number; longitude: number }> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
  const location = response.data.results[0].geometry.location;
  return { latitude: location.lat, longitude: location.lng };
};

// Calculate optimal route using Google Maps Directions API
export const getOptimalRoute = async (origin: string, destinations: string[]): Promise<string[]> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const originStr = `origin=${origin}`;
  const destinationStr = `destination=${destinations.pop()}`; // The last point is the destination
  const waypointsStr = `waypoints=optimize:true|${destinations.join('|')}`;
  
  const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?${originStr}&${destinationStr}&${waypointsStr}&key=${apiKey}`);
  
  // Extract the optimized route
  const route = response.data.routes[0].waypoint_order.map((index: number) => destinations[index]);
  
  return route;
};
