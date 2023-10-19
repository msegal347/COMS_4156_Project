import request from 'supertest';
import express, { Express } from 'express';
import allocationRoutes from '../../src/routes/allocationRoutes';
import "@jazzer.js/jest-runner/jest-extension";

const app: Express = express();
app.use(express.json());
app.use('/api/allocations', allocationRoutes);

describe('Allocation Routes', () => {

  it.fuzz('should create a new allocation', async () => {
    const mockAllocation = { location: 'Location A', items: ['item1', 'item2'] };

    const res = await (request(app) as any)
      .post('/api/allocations')
      .send(mockAllocation);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'Allocation created' });
  });

  it.fuzz('should get an allocation by ID', async () => {
    const res = await (request(app) as any)
      .get('/api/allocations/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Allocation fetched' });
  });

  it.fuzz('should update an allocation by ID', async () => {
    const updatedAllocation = { id: '1', location: 'Location B', items: ['item2', 'item3'] };

    const res = await (request(app) as any)
        .put('/api/allocations/1')
        .send(updatedAllocation);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Allocation updated' });
  });

  it.fuzz('should delete an allocation by ID', async () => {
    const res = await (request(app) as any)
      .delete('/api/allocations/1');

    expect(res.status).toBe(204);
  });
});
