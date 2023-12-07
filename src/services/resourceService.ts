import ResourceCategory, { IResourceCategory } from '../models/resourceModel';
import mongoose from 'mongoose';

export const resourceService = {
  async addOrUpdateUserResource(data: { categoryId: string, quantity: number, userId: string }): Promise<IResourceCategory | null> {
    console.log("Service: Add or Update User Resource - Data Received:", data);
    const category = await ResourceCategory.findById(data.categoryId);
    console.log("Service: Found Category:", category);
  
    if (!category) {
      console.log("Service: Category not found for ID:", data.categoryId);
      throw new Error('Resource category not found');
    }
  
    const objectIdUserId = new mongoose.Types.ObjectId(data.userId);
    const userResourceIndex = category.userResources.findIndex(ur => ur.userId.equals(objectIdUserId));
    console.log("Service: User Resource Index:", userResourceIndex);
  
    if (userResourceIndex > -1) {
      // Updating the quantity for the specific user
      category.userResources[userResourceIndex].quantity += data.quantity; // Use += to increment the quantity
      console.log("Service: Updated existing user resource");
    } else {
      // Adding a new user resource
      category.userResources.push({ userId: objectIdUserId, quantity: data.quantity } as any);
      console.log("Service: Added new user resource");
    }
  
    const savedCategory = await category.save();
    console.log("Service: Saved Category:", savedCategory);
    return savedCategory;
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
