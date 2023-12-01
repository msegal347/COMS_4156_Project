import request from 'supertest';
import { app } from '../../src/index';
import UserService from '../../src/services/userService';
import UserController from '../../src/controllers/userController';
import { mockRequest, mockResponse } from '../../src/utils/expressMock';

jest.mock('../../src/services/userService');

describe('UserController', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    req.body = {};
  });

  it('should create a new user on register', async () => {
    req.body = { email: 'test@example.com', password: 'password', role: 'user' };
    const mockUser = { _id: '1', email: 'test@example.com', role: 'user', toObject: () => ({ _id: '1', email: 'test@example.com', role: 'user' }) };
    (UserService.register as jest.Mock).mockResolvedValue(mockUser);

    await UserController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: '1', email: 'test@example.com', role: 'user' });
  });

  it('should return 400 on missing registration fields', async () => {
    req.body = { email: 'test@example.com', password: 'password' }; 

    await UserController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
  });

  it('should handle user login with valid credentials', async () => {
    req.body = { email: 'test@example.com', password: 'password' };
    const mockUser = { _id: '1', email: 'test@example.com', role: 'user', password: 'password' };
    (UserService.validateUser as jest.Mock).mockResolvedValue(mockUser);

    await UserController.login(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Login successful',
      user: expect.anything(),
      token: expect.anything()
    }));
  });

  it('should return 401 on invalid login credentials', async () => {
    req.body = { email: 'wrong@example.com', password: 'wrongpassword' };
    (UserService.validateUser as jest.Mock).mockResolvedValue(null);

    await UserController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

});
