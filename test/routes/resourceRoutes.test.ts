import request from 'supertest';
import { app, server } from '../../src/index';
import { resourceService } from '../../src/services/resourceService';

// Mocking resourceService
jest.mock('../../src/services/resourceService');

jest.mock('../../src/config/db', () => {
  return jest.fn(); // Mock connectDB as a function that does nothing
});

describe('Resource Routes', () => {
  it('should create a new resource', async () => {
    const mockResource = { name: 'Test Resource', type: 'Test Type' };
    (resourceService.createResource as jest.Mock).mockResolvedValue(mockResource);

    const res = await (request(app) as any).post('/api/resource').send(mockResource);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockResource);
  });

  it('should get all resources', async () => {
    const mockResources = [
      { name: 'Resource 1', type: 'Type A' },
      { name: 'Resource 2', type: 'Type B' },
    ];
    (resourceService.getResources as jest.Mock).mockResolvedValue(mockResources);

    const res = await (request(app) as any).get('/api/resource');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResources);
  });

  it('should get a resource by ID', async () => {
    const resourceId = '1';
    const mockResource = { _id: resourceId, name: 'Test Resource', type: 'Test Type' };
    (resourceService.getResourceById as jest.Mock).mockResolvedValue(mockResource);

    const res = await (request(app) as any).get(`/api/resource/${resourceId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResource);
  });

  it('should update a resource by ID', async () => {
    const resourceId = '1';
    const updatedResource = { _id: resourceId, name: 'Updated Resource', type: 'Test Type' };
    (resourceService.updateResource as jest.Mock).mockResolvedValue(updatedResource);

    const res = await (request(app) as any)
      .put(`/api/resource/${resourceId}`)
      .send(updatedResource);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedResource);
  });

  it('should delete a resource by ID', async () => {
    (resourceService.deleteResource as jest.Mock).mockResolvedValue(true);

    const resourceId = '1';
    const res = await (request(app) as any).delete(`/api/resource/${resourceId}`);

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  afterAll(
    () =>
      new Promise<void>(done => {
        if (server) {
          server.close(done);
        } else {
          done();
        }
      })
  );
});
