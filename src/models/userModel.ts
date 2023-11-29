import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['source', 'sink', 'auditor', 'admin'] },
  address: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

const User = model<IUser>('User', userSchema);

export default User;


