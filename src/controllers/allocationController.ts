import { Request, Response } from 'express';
import * as AllocationService from '../services/allocationService';

export const AllocationController = {
  
  // Get an allocation by ID
  async getAllocationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const allocation = await AllocationService.getAllocationById(id);
      if (!allocation) {
        return res.status(404).json({ error: 'Not Found: Allocation does not exist' });
      }
      res.status(200).json(allocation);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update an allocation by ID
  async updateAllocationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedAllocation = await AllocationService.updateAllocationById(id, req.body);
      if (!updatedAllocation) {
        return res.status(404).json({ error: 'Not Found: Allocation does not exist' });
      }
      res.status(200).json(updatedAllocation);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete an allocation by ID
  async deleteAllocationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await AllocationService.deleteAllocationById(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Not Found: Allocation does not exist' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Trigger the allocation process
  async triggerAllocation(req: Request, res: Response) {
    try {
      const allocationResults = await AllocationService.triggerAllocationProcess();
      res.status(200).json({ message: 'Allocation process completed', allocationResults });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get all allocations
  async getAllAllocations(req: Request, res: Response) {
    try {
      const allocations = await AllocationService.getAllAllocations();
      res.status(200).json(allocations);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default AllocationController;
