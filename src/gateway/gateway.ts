import { Express } from 'express';
import { createLogisticsRoutes } from '../routes/logisticsRoutes';
import { createAnalyticsRoutes } from '../routes/analyticsRoutes';
import entityRoutes from '../routes/entityRoutes';
import notificationRoutes from '../routes/notificationRoutes';
import resourceRoutes from '../routes/resourceRoutes';
import requestRoutes from '../routes/requestRoutes';
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
import userRoutes from '../routes/userRoutes';
import { consoleLogger, esLogger } from '../config/logger';

export const initializeGateway = (app: Express) => {
  app.get('/api/test', (req, res) => {
    res.send('API is working');
  });

  const logisticsRouter = createLogisticsRoutes({
    createRoute,
    getRouteById,
    updateRouteById,
    deleteRouteById,
    getOptimalRoute,
    getCoordinates,
  });

  const analyticsRouter = createAnalyticsRoutes({
    createRecord,
    getRecordById,
    updateRecordById,
    deleteRecordById,
  });

  app.use('/api/logistics', logisticsRouter);
  app.use('/api/analytics', analyticsRouter);
  app.use('/api/entities', entityRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/resources', resourceRoutes);
  app.use('/api/transactions', transactionRoutes);
  app.use('/api/allocations', allocationRoutes);
  app.use('/api/requests', requestRoutes);
  app.use('/api', userRoutes);

  // Additional middleware to log unhandled requests
  app.use((req, res, _) => {
    console.log(`Unhandled request to ${req.path}`);
    res.status(404).send('Endpoint not found');
  });
};
