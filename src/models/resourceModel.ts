import mongoose, { Document, Schema } from 'mongoose';

export interface IResource extends Document {
  category: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model<IResource>('Resource', resourceSchema);

export default Resource;
