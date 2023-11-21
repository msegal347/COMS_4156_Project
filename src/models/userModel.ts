import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['source', 'sink', 'auditor', 'admin'] },
});

const User = model('User', userSchema);

export default User;
