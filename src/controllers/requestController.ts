import { Request, Response } from 'express';
import requestService from '../services/requestService';
import * as AllocationService from '../services/allocationService'; 

export const requestController = {
  async createRequest(req: Request, res: Response) {
    try {
      // Extracting request data from the request body
      const requestData = req.body;

      // Creating a new request in the database
      const newRequest = await requestService.createRequest(requestData);

      // Triggering the allocation process after successfully creating the request
      const allocationResults = await AllocationService.triggerAllocationProcess();

      // Sending the newly created request and allocation results in the response
      res.status(201).json({ request: newRequest, allocationResults });
    } catch (error) {
      // Improved error handling to provide specific error messages
      if (error instanceof Error) {
        console.error('Error in createRequest:', error); // Log the error for debugging
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },
};

export default requestController;
