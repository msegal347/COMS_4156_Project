// src/routes/allocationRoutes.ts
import { Router } from 'express';
import {
  createAllocation,
  getAllocationById,
  updateAllocationById,
  deleteAllocationById,
  triggerAllocation,
  getAllAllocations,
} from '../controllers/allocationController';

const router = Router();

// Create a new allocation
router.post('/', createAllocation);

// Get an allocation by ID
router.get('/:id', getAllocationById);

// Update an allocation by ID
router.put('/:id', updateAllocationById);

// Delete an allocation by ID
router.delete('/:id', deleteAllocationById);

// Route for triggering the allocation process
router.post('/trigger-allocation', triggerAllocation);

router.get('/', getAllAllocations);

export default router;
