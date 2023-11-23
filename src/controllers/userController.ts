import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const user = await UserService.register(email, password, role);
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error.message === 'User already exists') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
