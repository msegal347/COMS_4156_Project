import express from 'express';
import { resourceController } from '../controllers/resourceController';

const router = express.Router();

// Create a new resource
router.post('/', async (req, res) => {
  await resourceController.createResource(req, res);
});

// Retrieve all resources
router.get('/', async (req, res) => {
  await resourceController.getResources(req, res);
});

// Retrieve a single resource by ID
router.get('/:id', async (req, res) => {
  await resourceController.getResourceById(req, res);
});

// Update a resource by ID
router.put('/:id', async (req, res) => {
  await resourceController.updateResource(req, res);
});

// Delete a resource
router.delete('/:id', async (req, res) => {
  await resourceController.deleteResource(req, res);
});

export default router;
