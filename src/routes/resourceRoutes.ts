import express from 'express';
import { resourceController } from '../controllers/resourceController';
import authenticate from '../middleware/authenticate'; 

const router = express.Router();

// Add or Update a user's resource
router.post('/', authenticate, async (req, res) => {
  await resourceController.addOrUpdateUserResource(req, res);
});

// Retrieve all resources
router.get('/', async (req, res) => {
  await resourceController.getResources(req, res);
});

// Retrieve a single resource by ID
router.get('/:id', async (req, res) => {
  await resourceController.getResourceById(req, res);
});

// Delete a user's resource entry
router.delete('/:id', authenticate, async (req, res) => {
  await resourceController.deleteResource(req, res);
});

export default router;
