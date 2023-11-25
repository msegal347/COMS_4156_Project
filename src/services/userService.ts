import User, { IUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import { getCoordinates } from '../utils/googleMaps';

class UserService {
  async register(email: string, password: string, role: string, address?: string) {
    if (!email || !password || !role) {
      throw new Error('Missing required fields');
    }

    if (await User.findOne({ email })) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let coordinates: { latitude: number; longitude: number; } | undefined;
    if ((role === 'source' || role === 'sink') && address) {
      coordinates = await getCoordinates(address);
    }

    const user = new User({ email, password: hashedPassword, role, address, coordinates });
    await user.save();

    return user;
  }
}

export default new UserService();
