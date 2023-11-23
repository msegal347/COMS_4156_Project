import User from '../models/userModel';
import bcrypt from 'bcrypt';

class UserService {
  async register(email: string, password: string, role: string) {
    if (!email || !password || !role) {
      throw new Error('Missing required fields');
    }

    if (await User.findOne({ email })) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
    );

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    return user;
  }
}

export default new UserService();
