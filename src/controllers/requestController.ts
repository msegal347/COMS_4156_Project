import { Request, Response } from 'express';
import requestService from '../services/requestService';
import { IRequest } from '../models/requestModel';

export const requestController = {
  async createRequest(req: Request, res: Response) {
    try {
      const requestData: IRequest = req.body;
      const newRequest = await requestService.createRequest(requestData);
      res.status(201).json(newRequest);
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
