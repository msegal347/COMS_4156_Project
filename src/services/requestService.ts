import Request, { IRequest } from '../models/requestModel';

const requestService = {
  async createRequest(requestData: IRequest): Promise<IRequest> {
    const newRequest = new Request(requestData);
    await newRequest.save();
    return newRequest;
  },
};

export default requestService;
