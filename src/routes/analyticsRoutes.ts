import { Router } from 'express';

export const createAnalyticsRoutes = ({
  createRecord,
  getRecordById,
  updateRecordById,
  deleteRecordById,
}) => {
  const router = Router();

  // Create a new analytics record
  router.post('/', createRecord);

  // Get a analytics record by ID
  router.get('/:id', getRecordById);

  // Update a analytics record by ID
  router.put('/:id', updateRecordById);

  // Delete a analytics record by ID
  router.delete('/:id', deleteRecordById);

  return router;
};
