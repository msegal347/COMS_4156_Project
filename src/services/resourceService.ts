import Resource, { IResource } from '../models/resourceModel';
import mongoose from 'mongoose';

export const resourceService = {
  // In resourceService.js or equivalent file
  async createResource(data) {
    const existingResource = await Resource.findOne({ category: data.category });
    if (existingResource) {
      existingResource.quantity += data.quantity;
      return await existingResource.save();
    } else {
      const newResource = new Resource(data);
      return await newResource.save();
    }
  },

  // Retrieve all resources
  async getResources(): Promise<IResource[]> {
    return await Resource.find({});
  },

  // Retrieve a single resource by ID
  async getResourceById(id: string): Promise<IResource | null> {
    return await Resource.findById(id);
  },

  // Update a resource
  async updateResource(id: string, updates: any): Promise<IResource | null> {
    return await Resource.findByIdAndUpdate(id, updates, { new: true });
  },

  // Delete a resource
  async deleteResource(id: string): Promise<IResource | null> {
    return await Resource.findByIdAndDelete(id);
  },
};
