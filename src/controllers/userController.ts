import { Request, Response } from 'express';
import UserService from '../services/userService';
import jwt from 'jsonwebtoken';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, role, address } = req.body;
      if (!email || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const user = await UserService.register(email, password, role, address);
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const errorMessage = (error as { message: string }).message;
        if (errorMessage === 'User already exists') {
          return res.status(409).json({ message: errorMessage });
        }
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Login method
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate email and password
      const user = await UserService.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret is not defined');
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Respond with user info and token
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const errorMessage = (error as { message: string }).message;
        return res.status(500).json({ message: errorMessage });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
