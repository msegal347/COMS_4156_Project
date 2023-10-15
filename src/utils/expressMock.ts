import { Request, Response, NextFunction } from 'express';

// Mock Express request
export const mockRequest = (): Partial<Request> => {
  return {};
};

// Mock Express response
export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  return res;
};

// Mock Express next function
export const mockNext = (): NextFunction => {
  return jest.fn();
};
