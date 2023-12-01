import UserService from '../../src/services/userService';
import User from '../../src/models/userModel';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('UserService', () => {
  it('should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      role: 'member', // Assuming 'member' is a valid role
      apikey: 'apikey123',
    };
    const hashedPassword = 'hashedPassword123';

    bcrypt.hash.mockResolvedValue(hashedPassword);

    // Simulate a Mongoose document
    const mockUser = new User({ ...userData, password: hashedPassword });
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(User, 'create').mockResolvedValueOnce([mockUser]); 

    const result = await UserService.register(userData.email, userData.password, userData.role, userData.apikey);

    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(User.create).toHaveBeenCalledWith({ ...userData, password: hashedPassword });
    expect(result).toEqual(mockUser);
  });
});
