import { Express } from 'express';
import { createLogisticsRoutes } from '../routes/logisticsRoutes';
import { createAnalyticsRoutes } from '../routes/analyticsRoutes';
import entityRoutes from '../routes/entityRoutes';
import notificationRoutes from '../routes/notificationRoutes';
import resourceRoutes from '../routes/resourceRoutes';
import transactionRoutes from '../routes/transactionRoutes';
import allocationRoutes from '../routes/allocationRoutes';
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

  // Use the routers as middleware on their respective paths
  app.use('/api/logistics', logisticsRouter);
  app.use('/api/analytics', analyticsRouter);
  app.use('/api/entities', entityRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/resources', resourceRoutes);
  app.use('/api/transactions', transactionRoutes);
  app.use('/api/allocations', allocationRoutes);
};
