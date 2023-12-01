import UserService from '../../src/services/userService';
import User from '../../src/models/userModel';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
  it('should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      role: 'member',
      apikey: 'apikey123',
    };
    const hashedPassword = 'hashedPassword123';

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

    // Simulate a Mongoose document
    const mockUser = new User({ ...userData, password: hashedPassword });
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(User, 'create').mockResolvedValueOnce([mockUser] as any); 

    const result = await UserService.register(userData.email, userData.password, userData.role, userData.apikey);

    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(User.create).toHaveBeenCalledWith({ ...userData, password: hashedPassword });
    expect(result).toEqual(mockUser);
  });
});
