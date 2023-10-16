import { Express } from 'express';
import { createLogisticsRoutes } from '../routes/logisticsRoutes';
import { createAnalyticsRoutes } from '../routes/analyticsRoutes';
import {
  createRoute,
  getRouteById,
  updateRouteById,
  deleteRouteById,
  getOptimalRoute,
  getCoordinates,
} from '../controllers/logisticsController';
import {
  createRecord,
  getRecordById,
  updateRecordById,
  deleteRecordById,
} from '../controllers/analyticsController';

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
  // Initialize analytics routes with controllers
  const analyticsRouter = createAnalyticsRoutes({
    createRecord,
    getRecordById,
    updateRecordById,
    deleteRecordById,
  });

  // Routes for Logistics Services
  app.use('/api/logistics', logisticsRouter);
  // Routes for Analytics Services
  app.use('/api/analytics', analyticsRouter);
};
