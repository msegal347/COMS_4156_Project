import { Request, Response } from 'express';
import { resourceService } from '../services/resourceService';

interface CustomRequest extends Request {
  user?: {
    id: string;
  }
}

export const resourceController = {
  async addOrUpdateUserResource(req: CustomRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const { categoryId, quantity } = req.body;
      const updatedResource = await resourceService.addOrUpdateUserResource({ categoryId, quantity, userId });
      res.status(200).json(updatedResource);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  async getResources(req: Request, res: Response) {
    try {
      const resources = await resourceService.getResources();
      res.status(200).json(resources);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  async getResourceById(req: Request, res: Response) {
    try {
      const resourceId = req.params.id;
      const resource = await resourceService.getResourceById(resourceId);
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.status(200).json(resource);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  async deleteResource(req: CustomRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const resourceId = req.params.id;
      const result = await resourceService.deleteResource(resourceId, userId);
      if (!result) {
        return res.status(404).json({ error: 'Resource not found or unauthorized' });
      }
      res.status(204).json({ message: 'Resource deleted' });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

};

export default resourceController;
