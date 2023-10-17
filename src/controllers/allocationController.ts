import { Request, Response } from 'express';

export const createAllocation = async (req: Request, res: Response) => {
  try {
    res.status(201).json({ message: 'Allocation created' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllocationById = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Allocation fetched' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateAllocationById = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Allocation updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteAllocationById = async (req: Request, res: Response) => {
  try {
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
