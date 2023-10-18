import mongoose, { Document, Schema } from 'mongoose';

export interface IResource extends Document {
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model<IResource>('Resource', resourceSchema);

export default Resource;
