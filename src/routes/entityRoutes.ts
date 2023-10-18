import express from 'express';
import * as entityController from '../controllers/entityController';

const router = express.Router();

// Create a new Entity
router.post('/', async (req, res, next) => {
  try {
    const newEntity = await entityController.createEntity(req, res);
    res.status(201).json(newEntity);
  } catch (error) {
    next(error);
  }
});

// Retrieve all Entities
router.get('/', async (req, res, next) => {
  try {
    const entities = await entityController.getAllEntities(req, res);
    res.status(200).json(entities);
  } catch (error) {
    next(error);
  }
});

// Retrieve a single Entity by ID
router.get('/:id', async (req, res, next) => {
  try {
    const entity = await entityController.getEntityById(req, res);
    if (entity) {
      res.status(200).json(entity);
    } else {
      res.status(404).send('Entity not found');
    }
  } catch (error) {
    next(error);
  }
});

// Update an Entity by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedEntity = await entityController.updateEntityById(req, res);
    if (updatedEntity) {
      res.status(200).json(updatedEntity);
    } else {
      res.status(404).send('Entity not found');
    }
  } catch (error) {
    next(error);
  }
});

// Delete an Entity by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await entityController.deleteEntityById(req, res);
    if (result) {
      res.status(204).send();  // No content to send back
    } else {
      res.status(404).send('Entity not found');
    }
  } catch (error) {
    next(error);
  }
});

export default router;
