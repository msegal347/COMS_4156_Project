import ResourceCategory, { IResourceCategory } from '../models/resourceModel';
import mongoose from 'mongoose';

export const resourceService = {
  async addOrUpdateUserResource(data: { categoryId: string, quantity: number, userId: string }): Promise<IResourceCategory | null> {
    const category = await ResourceCategory.findById(data.categoryId);
    if (!category) {
      throw new Error('Resource category not found');
    }

    // Convert string userId to ObjectId
    const objectIdUserId = new mongoose.Types.ObjectId(data.userId);

    // Find the user's existing resource entry
    const userResourceIndex = category.userResources.findIndex(ur => ur.userId.equals(objectIdUserId));

    if (userResourceIndex > -1) {
      // Update the existing user's resource quantity
      category.userResources[userResourceIndex].quantity = data.quantity;
    } else {
      // Push the new resource data into the userResources array with type assertion
      category.userResources.push({ userId: objectIdUserId, quantity: data.quantity } as any);
    }

    return await category.save();
  },

  async getResources(): Promise<IResourceCategory[]> {
    // Retrieving all resources along with the user-specific quantities
    return await ResourceCategory.find({}).populate('userResources.userId');
  },

  async getResourceById(id: string): Promise<IResourceCategory | null> {
    // Retrieving a single resource by ID along with the user-specific quantities
    return await ResourceCategory.findById(id).populate('userResources.userId');
  },

  async deleteResource(id: string, userId: string): Promise<IResourceCategory | null> {
    // Deleting a resource entry for a specific user
    const resource = await ResourceCategory.findById(id);
    if (!resource) {
      return null; 
    }

    // Remove the user's entry from the userResources array
    resource.userResources = resource.userResources.filter(ur => !ur.userId.equals(userId));
    return await resource.save();
  },

};

export default resourceService;
