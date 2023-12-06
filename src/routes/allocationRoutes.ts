// src/routes/allocationRoutes.ts
import { Router } from 'express';
import AllocationController from '../controllers/allocationController';

const router = Router();

// Get an allocation by ID
router.get('/:id', AllocationController.getAllocationById);

// Update an allocation by ID
router.put('/:id', AllocationController.updateAllocationById);

// Delete an allocation by ID
router.delete('/:id', AllocationController.deleteAllocationById);

// Route for triggering the allocation process
router.post('/trigger-allocation', AllocationController.triggerAllocation);

// Get all allocations
router.get('/', AllocationController.getAllAllocations);

export default router;
