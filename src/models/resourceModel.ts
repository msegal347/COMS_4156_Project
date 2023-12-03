import mongoose, { Document, Schema } from 'mongoose';

interface IResourceItem extends Document {
  name: string;
  quantity: number;
}

const resourceItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export interface IResourceCategory extends Document {
  category: string;
  items: IResourceItem[];
}

const resourceCategorySchema = new Schema({
  category: { type: String, required: true, unique: true },
  items: [resourceItemSchema],
});

const ResourceCategory = mongoose.model<IResourceCategory>('ResourceCategory', resourceCategorySchema);

export default ResourceCategory;
