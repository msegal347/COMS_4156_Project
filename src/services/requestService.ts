import Request, { IRequest } from '../models/requestModel';

export const requestService = {
  async createRequest(requestData: any): Promise<IRequest> {
    const newRequest = new Request(requestData);
    await newRequest.save();
    return newRequest;
  },
};

export default requestService;
