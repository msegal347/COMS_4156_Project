// test/controllers/entityController.test.ts

import * as entityController from '../../src/controllers/entityController';
import { Entity } from '../../src/models/entityModel';

// Mocking Entity model methods
jest.mock('../../src/models/entityModel', () => ({
  Entity: {
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    find: jest.fn()
  },
}));

describe('Entity Controller Tests', () => {
  it('should create an entity', async () => {
    const mockEntity = { name: 'Test Entity', attribute: 'Test Attribute' };
    (Entity.create as jest.Mock).mockResolvedValue(mockEntity);
    const mockReq: any = { body: mockEntity };
    const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await entityController.createEntity(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockEntity);
  });

  it('should get an entity by ID', async () => {
    const mockEntity = { id: '1', name: 'Test Entity', attribute: 'Test Attribute' };
    (Entity.findById as jest.Mock).mockResolvedValue(mockEntity);
    const mockReq: any = { params: { id: '1' } };
    const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await entityController.getEntityById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockEntity);
  });

  it('should update an entity by ID', async () => {
    const mockUpdatedEntity = { id: '1', name: 'Updated Entity', attribute: 'Updated Attribute' };
    (Entity.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedEntity);
    const mockReq: any = { params: { id: '1' }, body: mockUpdatedEntity };
    const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await entityController.updateEntityById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedEntity);
  });

  it('should delete an entity by ID', async () => {
    (Entity.findByIdAndDelete as jest.Mock).mockResolvedValue(true);
    const mockReq: any = { params: { id: '1' } };
    const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await entityController.deleteEntityById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.json).toHaveBeenCalledWith();
  });

  it('should get all entities', async () => {
    const mockEntities = [
      { id: '1', name: 'Entity 1', attribute: 'Attribute 1' },
      { id: '2', name: 'Entity 2', attribute: 'Attribute 2' },
    ];
    (Entity.find as jest.Mock).mockResolvedValue(mockEntities);
    const mockReq: any = {};
    const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await entityController.getAllEntities(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockEntities);
  });
});

