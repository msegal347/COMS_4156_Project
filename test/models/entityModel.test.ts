import mongoose from 'mongoose';
import { Entity } from '../../src/models/entityModel';

// Mock mongoose functions
jest.mock('mongoose', () => ({
    connect: jest.fn(),
    connection: {
      close: jest.fn(),
    },
  }));
  
  // Mock Entity model methods
  jest.mock('../../src/models/entityModel', () => ({
    Entity: {
      create: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    },
  }));
  
  describe('Entity Model Test', () => {
  
    beforeAll(async () => {
      // Mocked URI
      const mockedMongoURI = 'mongodb://mocked:27017/mockedDatabase';
  
      await mongoose.connect(mockedMongoURI, expect.anything());
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  
    it('should mock Mongoose connect function', async () => {
      expect(mongoose.connect).toHaveBeenCalledWith('mongodb://mocked:27017/mockedDatabase', expect.anything());
    });
  
    it('should mock Mongoose connection close function', async () => {
      expect(mongoose.connection.close).not.toHaveBeenCalled(); 
      await mongoose.connection.close();
      expect(mongoose.connection.close).toHaveBeenCalled();
    });
  
    it('should create a new entity', async () => {
      const mockEntity = { name: 'TestEntity', attribute: 'TestAttribute' };
      (Entity.create as jest.Mock).mockResolvedValue(mockEntity);
      const result = await Entity.create(mockEntity);
      expect(result).toEqual(mockEntity);
    });
  
    it('should find an entity by ID', async () => {
      const mockEntity = { _id: 'someId', name: 'TestEntity', attribute: 'TestAttribute' };
      (Entity.findById as jest.Mock).mockResolvedValue(mockEntity);
      const result = await Entity.findById('someId');
      expect(result).toEqual(mockEntity);
    });
  
    it('should update an entity by ID', async () => {
      const mockEntity = { _id: 'someId', name: 'UpdatedEntity', attribute: 'TestAttribute' };
      (Entity.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockEntity);
      const result = await Entity.findByIdAndUpdate('someId', { name: 'UpdatedEntity' });
      expect(result).toEqual(mockEntity);
    });
  
    it('should delete an entity by ID', async () => {
      (Entity.findByIdAndDelete as jest.Mock).mockResolvedValue(true);
      const result = await Entity.findByIdAndDelete('someId');
      expect(result).toEqual(true);
    });
});
