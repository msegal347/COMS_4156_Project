import Resource, { IResource } from '../models/resourceModel';
import mongoose from 'mongoose';

export const resourceService = {
  // Create a new resource
  async createResource(data: any): Promise<IResource> {
    const resource = new Resource(data);
    return await resource.save();
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
