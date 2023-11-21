import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const user = await UserService.register(email, password, role);
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
