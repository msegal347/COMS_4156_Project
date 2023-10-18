import { Document } from 'mongoose';
import { Entity } from '../models/entityModel'; // Import only the real Entity

export interface IEntityService {
  createEntity(data: Document): Promise<Document>;
  getAllEntities(): Promise<Document[]>;
  getEntityById(id: string): Promise<Document | null>;
  updateEntityById(id: string, data: Partial<Document>): Promise<Document | null>;
  deleteEntityById(id: string): Promise<boolean>;
}

class EntityService implements IEntityService {
  async createEntity(data: Document): Promise<Document> {
    const newEntity = new Entity(data);
    const savedEntity = await newEntity.save();
    return savedEntity;
  }

  async getAllEntities(): Promise<Document[]> {
    return await Entity.find({});
  }

  async getEntityById(id: string): Promise<Document | null> {
    return await Entity.findById(id);
  }

  async updateEntityById(id: string, data: Partial<Document>): Promise<Document | null> {
    return await Entity.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteEntityById(id: string): Promise<boolean> {
    const result = await Entity.findByIdAndDelete(id);
    return !!result;
  }
}

export default new EntityService();
