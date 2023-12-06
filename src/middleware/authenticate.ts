import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string; } 
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret is not defined');
    }

    // Decoding the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    // Verify the payload has the expected properties
    if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
      req.user = { id: decoded.id, role: decoded.role };
      next();
    } else {
      res.status(400).json({ message: 'Invalid token payload.' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authenticate;
