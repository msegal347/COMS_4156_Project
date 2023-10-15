import { logger } from '../../src/config/logger';
import { Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from 'winston';

const mockRequest = {} as Request;
const mockResponse = {} as Response;
const mockNext: NextFunction = jest.fn();

jest.mock('winston', () => ({
  createLogger: jest.fn(),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    label: jest.fn(),
    printf: jest.fn()
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn()
  }
}));

describe('Logger Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log the HTTP method and URL', () => {
    mockRequest.method = 'GET';
    mockRequest.url = '/test';
    
    const infoSpy = jest.spyOn(createLogger(), 'info');

    logger(mockRequest, mockResponse, mockNext);
    
    expect(infoSpy).toHaveBeenCalledWith('HTTP GET /test');
    expect(mockNext).toHaveBeenCalled();
  });
});
