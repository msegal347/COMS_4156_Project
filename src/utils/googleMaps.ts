import { get } from 'https';
import { URL } from 'url';

// Get the coordinates of an address
export const getCoordinates = async (
  address: string
): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = new URL(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    );

    get(url, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        const location = response.results[0].geometry.location;
        resolve({ latitude: location.lat, longitude: location.lng });
      });
    }).on('error', err => {
      reject(err);
    });
  });
};

// Get the optimal route between an origin and a list of destinations
export const getOptimalRoute = async (
  origin: string,
  destinations: string[]
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const originStr = `origin=${origin}`;

    // Copy the destinations array before popping the last element
    const destinationsCopy = [...destinations];
    const destinationStr = `destination=${destinationsCopy.pop()}`;

    const waypointsStr = `waypoints=optimize:true|${destinationsCopy.join('|')}`;
    const url = new URL(
      `https://maps.googleapis.com/maps/api/directions/json?${originStr}&${destinationStr}&${waypointsStr}&key=${apiKey}`
    );

    get(url, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        const route = response.routes[0].waypoint_order.map((index: number) => destinations[index]);
        resolve(route);
      });
    }).on('error', err => {
      reject(err);
    });
  });
};
