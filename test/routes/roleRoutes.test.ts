import express from 'express';
import request from 'supertest';
import roleRoutes from '../../src/routes/roleRoutes';

const app = express();
app.use('/api', roleRoutes);

describe('Role Routes', () => {
  it('should return a list of roles', async () => {
    const res = await request(app).get('/api/roles');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(['source', 'sink', 'auditor', 'admin']);
  });
});
