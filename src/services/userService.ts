import User from '../models/User';
import bcrypt from 'bcrypt';

class UserService {
  async register(email: string, password: string, role: string) {
    if (await User.findOne({ email })) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    return user;
  }
}

export default new UserService();
