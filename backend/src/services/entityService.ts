import { Document } from 'mongoose';
import { Entity } from '../models/entityModel'; // Import only the real Entity

// Create an interface that describes the entity service
export interface IEntityService {
  createEntity(data: Document): Promise<Document>;
  getAllEntities(): Promise<Document[]>;
  getEntityById(id: string): Promise<Document | null>;
  updateEntityById(id: string, data: Partial<Document>): Promise<Document | null>;
  deleteEntityById(id: string): Promise<boolean>;
}

// Create the entity service class that implements the entity service interface
class EntityService implements IEntityService {
  // create entity
  async createEntity(data: Document): Promise<Document> {
    const newEntity = new Entity(data);
    const savedEntity = await newEntity.save();
    return savedEntity;
  }

  // get all entities
  async getAllEntities(): Promise<Document[]> {
    return await Entity.find({});
  }

  // get entity by id
  async getEntityById(id: string): Promise<Document | null> {
    return await Entity.findById(id);
  }

  // update entity by id
  async updateEntityById(id: string, data: Partial<Document>): Promise<Document | null> {
    return await Entity.findByIdAndUpdate(id, data, { new: true });
  }

  // delete entity by id
  async deleteEntityById(id: string): Promise<boolean> {
    const result = await Entity.findByIdAndDelete(id);
    return !!result;
  }
}

// Export an instance of the entity service class
export default new EntityService();
