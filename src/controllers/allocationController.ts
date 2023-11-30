import { Request, Response } from 'express';
import * as AllocationService from '../services/allocationService';

// Utility function to check if an object is empty
const isEmptyObject = (obj: any): boolean => {
  return !obj || Object.keys(obj).length === 0;
};

// create the allocation
export const createAllocation = async (req: Request, res: Response) => {
  try {
    const { name, resource, amount } = req.body;

    if (isEmptyObject(req.body) || !name || !resource || amount === undefined) {
      res.status(400).json({ error: 'Bad Request: Missing required fields' });
      return;
    }

    const newAllocation = await AllocationService.createAllocation(req.body);
    res.status(201).json(newAllocation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//get the allocation by id
export const getAllocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'Bad Request: Missing ID parameter' });
      return;
    }
    const allocation = await AllocationService.getAllocationById(id);
    if (!allocation) {
      res.status(404).json({ error: 'Not Found: Allocation does not exist' });
      return;
    }
    res.status(200).json(allocation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// update the allocation by id
export const updateAllocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'Bad Request: Missing ID parameter' });
      return;
    }
    if (isEmptyObject(req.body)) {
      res.status(400).json({ error: 'Bad Request: Missing request body' });
      return;
    }
    const updatedAllocation = await AllocationService.updateAllocationById(id, req.body);
    if (!updatedAllocation) {
      res.status(404).json({ error: 'Not Found: Allocation does not exist' });
      return;
    }
    res.status(200).json(updatedAllocation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// delete the allocation by id
export const deleteAllocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'Bad Request: Missing ID parameter' });
      return;
    }
    const deleted = await AllocationService.deleteAllocationById(id);
    if (!deleted) {
      res.status(404).json({ error: 'Not Found: Allocation does not exist' });
      return;
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const triggerAllocation = async (req: Request, res: Response) => {
  try {
    const allocationResults = await AllocationService.triggerAllocationProcess();
    res.status(200).json({ message: 'Allocation process completed', allocationResults });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
