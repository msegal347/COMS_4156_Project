import User, { IUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import { getCoordinates } from '../utils/googleMaps';
import dotenv from 'dotenv';

dotenv.config();

class UserService {
  async register(email: string, password: string, role: string, apikey: string, address?: string) {
    if (!email || !password || !role) {
      throw new Error('Missing required fields');
    }

    if (await User.findOne({ email })) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let coordinates: { lat: number; lng: number } | undefined;
    if ((role === 'source' || role === 'sink') && address) {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        throw new Error('Google Maps API key is not set');
      }
      const geocodedCoordinates = await getCoordinates(address, apiKey);
      coordinates = { lat: geocodedCoordinates.latitude, lng: geocodedCoordinates.longitude };
    }

    const user = new User({ email, password: hashedPassword, role, address, coordinates });
    await user.save();

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }


  async getUserById(userId: string) {
    try {
      return await User.findById(userId).select('-password');
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async getAllUsers() {
    try {
      // Select all fields except for password
      return await User.find({}).select('-password');
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }
}

export default new UserService();
