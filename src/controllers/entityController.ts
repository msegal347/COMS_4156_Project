// src/controllers/entityController.ts

import { Request, Response } from 'express';
import { Entity } from '../models/entityModel';

// Creates a new entity
export const createEntity = async (req: Request, res: Response) => {
  try {
    const entityData = req.body;
    const newEntity = await Entity.create(entityData);
    res.status(201).json(newEntity);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error as any).code === 11000) {
      res.status(400).json({ error: 'Entity name must be unique' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

// Gets the entity with the given ID
export const getEntityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const entity = await Entity.findById(id);
    if (!entity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Updates the entity with the given ID
export const updateEntityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedEntity = await Entity.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedEntity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.status(200).json(updatedEntity);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Deletes the entity with the given ID
export const deleteEntityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEntity = await Entity.findByIdAndDelete(id);
    if (!deletedEntity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Gets all entities
export const getAllEntities = async (req: Request, res: Response): Promise<void> => {
  try {
    const entities = await Entity.find({});
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
