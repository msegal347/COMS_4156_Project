import mongoose, { Document, Schema } from 'mongoose';

export interface IUserResource extends Document {
  userId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IResourceCategory extends Document {
  category: string;
  userResources: IUserResource[];  
}

const userResourceSchema = new Schema<IUserResource>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true }
});

const resourceCategorySchema = new Schema({
  category: { type: String, required: true, unique: true },
  userResources: [userResourceSchema]
});

const ResourceCategory = mongoose.model<IResourceCategory>('ResourceCategory', resourceCategorySchema);

export default ResourceCategory;
