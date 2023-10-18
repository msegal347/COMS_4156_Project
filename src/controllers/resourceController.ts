import { Request, Response } from 'express';
import Resource, { IResource } from '../models/resourceModel';

export const resourceController = {
  // Create a new resource
  async createResource(req: Request, res: Response) {
    try {
      const data: IResource = req.body;
      const resource = new Resource(data);
      const savedResource = await resource.save();
      res.status(201).json(savedResource);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // Retrieve all resources
  async getResources(req: Request, res: Response) {
    try {
      const resources = await Resource.find({});
      res.status(200).json(resources);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // Retrieve a single resource by ID
  async getResourceById(req: Request, res: Response) {
    try {
      const resourceId = req.params.id;
      const resource = await Resource.findById(resourceId);
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.status(200).json(resource);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // Update a resource by ID
  async updateResource(req: Request, res: Response) {
    try {
      const resourceId = req.params.id;
      const updates = req.body;
      const resource = await Resource.findByIdAndUpdate(resourceId, updates, { new: true });
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.status(200).json(resource);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // Delete a resource
  async deleteResource(req: Request, res: Response) {
    try {
      const resourceId = req.params.id;
      const resource = await Resource.findByIdAndDelete(resourceId);
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.status(204).json({ message: 'Resource deleted' });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },
};
