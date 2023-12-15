import { Request, Response } from 'express';
import requestService from '../services/requestService';
import { IRequest } from '../models/requestModel';
import * as AllocationService from '../services/allocationService'; 

interface CustomRequest extends Request {
  user?: {
    id: string;
  }
}

export const requestController = {
  async createRequest(req: CustomRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const requestData: IRequest = req.body;
      const newRequest = await requestService.createRequest({ ...requestData, userId });

      const allocationResults = await AllocationService.triggerAllocationProcess();

      res.status(201).json({request: newRequest, allocationResults});
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },
};

export default requestController;
