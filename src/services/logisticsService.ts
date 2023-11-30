import * as GoogleMaps from '../utils/googleMaps';
import LogisticsModel from '../models/logisticsModel';

// Create a new logistics route
export const createRoute = async (routeData: any): Promise<any> => {
  const newRoute = new LogisticsModel(routeData);
  await newRoute.save();
  return newRoute;
};

// Get a logistics route by ID
export const getRouteById = async (id: string): Promise<any> => {
  try {
    const route = await LogisticsModel.findById(id);
    return route;
  } catch (err) {
    throw new Error(`Error in getting route by ID: ${err}`);
  }
};

// Update a logistics route by ID
export const updateRouteById = async (id: string, updatedData: any): Promise<any> => {
  try {
    const updatedRoute = await LogisticsModel.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedRoute;
  } catch (err) {
    throw new Error(`Error in updating route by ID: ${err}`);
  }
};

// Delete a logistics route by ID
export const deleteRouteById = async (id: string): Promise<void> => {
  try {
    const result = await LogisticsModel.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(`Error in deleting route by ID: ${err}`);
  }
};

// Calculate an optimal route given an origin and a list of destinations
export const calculateOptimalRoute = async (
  origin: string,
  destinations: string[],
  apikey: string | undefined
): Promise<string[]> => {
  return await GoogleMaps.getOptimalRoute(origin, destinations, apikey);
};

// Get coordinates for an address
export const getCoordinates = async (
  address: string,
  apikey: string | undefined
): Promise<{ latitude: number; longitude: number }> => {
  return await GoogleMaps.getCoordinates(address, apikey);
};
