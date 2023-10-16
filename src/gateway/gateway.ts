import { Express } from 'express';
import { createLogisticsRoutes } from '../routes/logisticsRoutes';
import {
  createRoute,
  getRouteById,
  updateRouteById,
  deleteRouteById,
  getOptimalRoute,
  getCoordinates,
} from '../controllers/logisticsController';

// This function initializes the API Gateway
export const initializeGateway = (app: Express) => {
  // Initialize logistics routes with controllers
  const logisticsRouter = createLogisticsRoutes({
    createRoute,
    getRouteById,
    updateRouteById,
    deleteRouteById,
    getOptimalRoute,
    getCoordinates,
  });

  // Routes for Logistics Services
  app.use('/api/logistics', logisticsRouter);
};
