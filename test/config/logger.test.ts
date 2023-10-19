import { logger } from '../../src/config/logger';
import { Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from 'winston';

const mockRequest = {} as Request;
const mockResponse = {} as Response;
const mockNext: NextFunction = jest.fn();

jest.mock('winston', () => ({
  createLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
    error: jest.fn(),
  }),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    label: jest.fn(),
    printf: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
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

  it('should handle invalid request object', () => {
    mockRequest.method = undefined as any;
    mockRequest.url = undefined as any;

    const errorSpy = jest.spyOn(createLogger(), 'error');

    logger(mockRequest, mockResponse, mockNext);

    expect(errorSpy).toHaveBeenCalledWith('Invalid request object');
    expect(mockNext).toHaveBeenCalledWith(new Error('Invalid request object'));
  });

});
