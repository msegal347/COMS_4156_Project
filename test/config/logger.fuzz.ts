import { logger } from '../../src/config/logger';
import { Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from 'winston';
import "@jazzer.js/jest-runner/jest-extension";

const mockRequest = {} as Request;
const mockResponse = {} as Response;
const mockNext: NextFunction = jest.fn();

jest.mock('winston', () => ({
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      // add other methods you need
    }),
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

  it.fuzz('should log the HTTP method and URL', () => {
    mockRequest.method = 'GET';
    mockRequest.url = '/test';
    
    const infoSpy = jest.spyOn(createLogger(), 'info');

    logger(mockRequest, mockResponse, mockNext);
    
    expect(infoSpy).toHaveBeenCalledWith('HTTP GET /test');
    expect(mockNext).toHaveBeenCalled();
  });
});
