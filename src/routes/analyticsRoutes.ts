// src/routes/analyticsRoutes.ts

import { Router } from 'express';
import {
  createRecord,
  getRecordById,
  updateRecordById,
  deleteRecordById,
} from '../controllers/analyticsController';

const router = Router();

// Create a new analytics record
router.post('/', createRecord);

// Get an analytics record by ID
router.get('/:id', getRecordById);

// Update an analytics record by ID
router.put('/:id', updateRecordById);

// Delete an analytics record by ID
router.delete('/:id', deleteRecordById);

export default router;
