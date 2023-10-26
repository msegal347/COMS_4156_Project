import { Router } from 'express';

export const createLogisticsRoutes = ({
  createRoute,
  getRouteById,
  updateRouteById,
  deleteRouteById,
  getOptimalRoute,
  getCoordinates,
}) => {
  const router = Router();

  // Create a new logistics route
  router.post('/', createRoute);

  // Get a logistics route by ID
  router.get('/:id', getRouteById);

  // Update a logistics route by ID
  router.put('/:id', updateRouteById);

  // Delete a logistics route by ID
  router.delete('/:id', deleteRouteById);

  // Get optimal route using Google Maps API
  router.post('/optimize', getOptimalRoute);

  // Get coordinates for an address
  router.get('/coordinates/:address', getCoordinates);

  return router;
};
