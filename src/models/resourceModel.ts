import mongoose, { Document, Schema } from 'mongoose';

export interface IResourceCategory extends Document {
  category: string;
  quantity: number;
}

const resourceCategorySchema = new Schema({
  category: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 0 },
});

const ResourceCategory = mongoose.model<IResourceCategory>('ResourceCategory', resourceCategorySchema);

export default ResourceCategory;
