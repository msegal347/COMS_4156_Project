import request from 'supertest';
import express from 'express';
import * as entityController from '../../src/controllers/entityController';
import router from '../../src/routes/entityRoutes';

// Mock the controller methods
jest.mock('../../src/controllers/entityController', () => ({
  createEntity: jest.fn(),
  getAllEntities: jest.fn(),
  getEntityById: jest.fn(),
  updateEntityById: jest.fn(),
  deleteEntityById: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/', router);

describe('Entity Routes Tests', () => {
  it('should create a new entity', async () => {
    (entityController.createEntity as jest.Mock).mockResolvedValue('newEntity');
    const res = await request(app).post('/').send({});
    expect(res.status).toBe(201);
    expect(res.body).toEqual('newEntity');
  });

  it('should get all entities', async () => {
    (entityController.getAllEntities as jest.Mock).mockResolvedValue(['entity1', 'entity2']);
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(['entity1', 'entity2']);
  });

  it('should get an entity by ID', async () => {
    (entityController.getEntityById as jest.Mock).mockResolvedValue('entity');
    const res = await request(app).get('/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual('entity');
  });

  it('should update an entity by ID', async () => {
    (entityController.updateEntityById as jest.Mock).mockResolvedValue('updatedEntity');
    const res = await request(app).put('/1').send({});
    expect(res.status).toBe(200);
    expect(res.body).toEqual('updatedEntity');
  });

  it('should delete an entity by ID', async () => {
    (entityController.deleteEntityById as jest.Mock).mockResolvedValue(true);
    const res = await request(app).delete('/1');
    expect(res.status).toBe(204);
  });
});
