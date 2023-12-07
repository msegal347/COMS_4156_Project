import { Request, Response } from 'express';
import UserService from '../services/userService';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel';

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
    } catch (error: any) {
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
    console.log("Login request received:", req.body);
    try {
      const { email, password } = req.body;
      console.log(`Validating user: ${email}`);

      const user = await UserService.validateUser(email, password);
      if (!user) {
        console.log('Invalid credentials provided');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!process.env.JWT_SECRET) {
        console.log('JWT secret is not defined');
        throw new Error('JWT secret is not defined');
      }

      console.log(`User validated, signing token for user ID: ${user._id}`);
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      console.log(`Token generated: ${token}`);
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
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCurrentUser(req: Request, res: Response) {
    console.log('GetCurrentUser request received');
    try {
      const token = req.headers.authorization?.split(' ')[1];
      console.log(`Received token: ${token}`);

      if (!token || !process.env.JWT_SECRET) {
        console.log('Token missing or JWT secret not set');
        return res.status(401).json({ message: 'Unauthorized' });
      }

      console.log('Verifying token');
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      console.log(`Token decoded, user ID: ${decoded.id}`);

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        console.log('User not found with decoded ID');
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('User found, returning user data');
      res.json(user);
    } catch (error) {
      console.error('GetCurrentUser error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId); // If using UserService
      // const user = await User.findById(userId).select('-password'); // If directly using Mongoose
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
