import mongoose, { Document, Schema } from 'mongoose';

// Extend the default mongoose Document interface to include the required fields
export interface IResource extends Document {
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the resource model from the schema
const resourceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create the resource model from the schema
const Resource = mongoose.model<IResource>('Resource', resourceSchema);

// Export the resource model
export default Resource;
