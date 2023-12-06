import mongoose, { Schema, model, Document } from 'mongoose';

// Interface for User Document
export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  materials: mongoose.Types.ObjectId[];
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
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
});

const User = model<IUser>('User', userSchema);

export default User;
