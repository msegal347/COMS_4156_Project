import request from 'supertest';
import express, { Express } from 'express';
import allocationRoutes from '../../src/routes/allocationRoutes';
import * as AllocationService from '../../src/services/allocationService';

jest.mock('../../src/services/allocationService');

const app: Express = express();
app.use(express.json());
app.use('/api/allocations', allocationRoutes);

describe('Allocation Routes', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Create a new allocation
  it('should create a new allocation', async () => {
    (AllocationService.createAllocation as jest.Mock).mockResolvedValue({ name: 'Test', resource: 'CPU', amount: 5 });

    const mockAllocation = { name: 'Test', resource: 'CPU', amount: 5 };
    const res = await request(app).post('/api/allocations').send(mockAllocation);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ name: 'Test', resource: 'CPU', amount: 5 });
  });

  // Should not create an allocation with missing fields
  it('should not create an allocation with missing fields', async () => {
    const mockAllocation = { name: 'Test' };  // Missing resource and amount
    const res = await request(app).post('/api/allocations').send(mockAllocation);

    expect(res.status).toBe(400);
  });

  // Should get an allocation by ID
  it('should get an allocation by ID', async () => {
    (AllocationService.getAllocationById as jest.Mock).mockResolvedValue({ name: 'Test', resource: 'CPU', amount: 5 });

    const res = await request(app).get('/api/allocations/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ name: 'Test', resource: 'CPU', amount: 5 });
  });

  // Should not update an allocation with missing fields
  it('should not update an allocation with missing fields', async () => {
    const updatedAllocation = { name: 'Test Updated' };  // Missing resource and amount
    const res = await request(app).put('/api/allocations/1').send(updatedAllocation);

    expect(res.status).toBe(404);
  });

  // Should not get an allocation by non-existing ID
  it('should not get an allocation by non-existing ID', async () => {
    (AllocationService.getAllocationById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get('/api/allocations/nonexistent');

    expect(res.status).toBe(404);
  });

  // Should not update an allocation by non-existing ID
  it('should not update an allocation by non-existing ID', async () => {
    (AllocationService.updateAllocationById as jest.Mock).mockResolvedValue(null);

    const updatedAllocation = { name: 'Test Updated', resource: 'Memory', amount: 10 };
    const res = await request(app).put('/api/allocations/nonexistent').send(updatedAllocation);

    expect(res.status).toBe(404);
  });

  // Should not delete an allocation by non-existing ID
  it('should not delete an allocation by non-existing ID', async () => {
    (AllocationService.deleteAllocationById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete('/api/allocations/nonexistent');

    expect(res.status).toBe(404);
  });
  
});
