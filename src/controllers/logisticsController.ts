// src/controllers/logisticsController.ts

import * as LogisticsService from '../services/logisticsService';

// Create a new logistics route
export const createRoute = async (req, res, next) => {
  try {
    const routeData = req.body;
    const newRoute = await LogisticsService.createRoute(routeData);
    res.status(201).json(newRoute);
  } catch (err) {
    next(err);
  }
};

// Get a logistics route by ID
export const getRouteById = async (req, res, next) => {
  try {
    const routeId = req.params.id;
    const route = await LogisticsService.getRouteById(routeId);
    res.status(200).json(route);
  } catch (err) {
    next(err);
  }
};

// Update a logistics route by ID
export const updateRouteById = async (req, res, next) => {
  try {
    const routeId = req.params.id;
    const updatedData = req.body;
    const updatedRoute = await LogisticsService.updateRouteById(routeId, updatedData);
    res.status(200).json(updatedRoute);
  } catch (err) {
    next(err);
  }
};

// Delete a logistics route by ID
export const deleteRouteById = async (req, res, next) => {
  try {
    const routeId = req.params.id;
    await LogisticsService.deleteRouteById(routeId);
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

// Get optimal route using Google Maps API
export const getOptimalRoute = async (req, res, next) => {
  try {
    const origin = req.body.origin;
    const destinations = req.body.destinations;
    const apikey = req.body.key;
    const optimalRoute = await LogisticsService.calculateOptimalRoute(origin, destinations, apikey);
    res.status(200).json({ optimizedRoute: optimalRoute });
  } catch (err) {
    next(err);
  }
};

// Get coordinates for an address
export const getCoordinates = async (req, res, next) => {
  try {
    const address = req.params.address;
    const apikey = process.env.GOOGLE_MAPS_API_KEY;
    const coordinates = await LogisticsService.getCoordinates(address, apikey);
    res.status(200).json(coordinates);
  } catch (err) {
    next(err);
  }
};
