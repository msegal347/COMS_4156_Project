import * as GoogleMaps from '../utils/googleMaps';
import LogisticsModel from '../models/logisticsModel';

// Create a new logistics route
export const createRoute = async (routeData: any): Promise<any> => {
  try {
    const newRoute = new LogisticsModel(routeData);
    await newRoute.save();
    return newRoute;
  } catch (err) {
    throw new Error(`Error in creating new route: ${err}`);
  }
};

// Get a logistics route by ID
export const getRouteById = async (id: string): Promise<any> => {
  try {
    const route = await LogisticsModel.findById(id);
    if (!route) {
      throw new Error('Route not found');
    }
    return route;
  } catch (err) {
    throw new Error(`Error in getting route by ID: ${err}`);
  }
};

// Update a logistics route by ID
export const updateRouteById = async (id: string, updatedData: any): Promise<any> => {
  try {
    const updatedRoute = await LogisticsModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedRoute) {
      throw new Error('Route not found');
    }
    return updatedRoute;
  } catch (err) {
    throw new Error(`Error in updating route by ID: ${err}`);
  }
};

// Delete a logistics route by ID
export const deleteRouteById = async (id: string): Promise<void> => {
  try {
    const result = await LogisticsModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Route not found');
    }
  } catch (err) {
    throw new Error(`Error in deleting route by ID: ${err}`);
  }
};

// Calculate an optimal route given an origin and a list of destinations
export const calculateOptimalRoute = async (origin: string, destinations: string[]): Promise<string[]> => {
  try {
    return await GoogleMaps.getOptimalRoute(origin, destinations);
  } catch (err) {
    throw new Error(`Error in calculating optimal route: ${err}`);
  }
};

// Get coordinates for an address
export const getCoordinates = async (address: string): Promise<{ latitude: number; longitude: number }> => {
  try {
    return await GoogleMaps.getCoordinates(address);
  } catch (err) {
    throw new Error(`Error in getting coordinates: ${err}`);
  }
};
