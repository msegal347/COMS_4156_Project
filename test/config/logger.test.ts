import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

describe('Morgan Logger Test', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      method: 'GET',
      url: '/test',
      headers: {},
    } as Request;
    mockResponse = {
      statusCode: 200,
    } as Response;
    mockNext = jest.fn();
  });

  it('logs a simple GET request', () => {
    const morganMiddleware = morgan('combined', {
      stream: {
        write: (message: string) => {
          expect(message).toContain('GET');
          expect(message).toContain('test');
        },
      },
    });
    morganMiddleware(mockRequest as Request, mockResponse as Response, mockNext);
  });
});
