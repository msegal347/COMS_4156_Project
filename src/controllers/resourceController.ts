import { Request, Response } from 'express';
import ResourceCategory from '../models/resourceModel';

export const resourceController = {
  async createResource(req: Request, res: Response) {
    try {
      const { category, quantity } = req.body;
      const resourceCategory = await ResourceCategory.findOneAndUpdate(
        { category },
        { $inc: { quantity } },
        { new: true, upsert: true }
      );
      res.status(201).json(resourceCategory);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  async getResources(req: Request, res: Response) {
    try {
      const resources = await ResourceCategory.find({});
      res.status(200).json(resources);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  async getResourceById(req: Request, res: Response) {
    try {
      const resourceId = req.params.id;
      const resource = await ResourceCategory.findById(resourceId);
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.status(200).json(resource);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  async updateResource(req: Request, res: Response) {
    try {
      const resourceId = req.params.id;
      const updates = req.body;
      const resource = await ResourceCategory.findByIdAndUpdate(resourceId, updates, { new: true });
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.status(200).json(resource);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  async deleteResource(req: Request, res: Response) {
    try {
      const resourceId = req.params.id;
      const resource = await ResourceCategory.findByIdAndDelete(resourceId);
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.status(204).json({ message: 'Resource deleted' });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },
};

export default resourceController;
