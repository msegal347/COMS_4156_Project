// allocationIntegration.test.ts

import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../../src/index';  // Ensure this import path is correct
import { beforeAll, afterAll } from '@jest/globals';

let createdAllocationId: string;

beforeAll(async () => {
    // Connect to a test database
    const url = process.env.MONGO_URI || "mongodb://localhost:27017/testDB";
    
    // Define the connection options
    const options: mongoose.ConnectOptions & {useNewUrlParser: boolean} = {
        useNewUrlParser: true,
    };

    await mongoose.connect(url, options);
});

afterAll(async () => {
    await mongoose.connection.close();
});

// Test POST
describe('POST /api/allocations/', () => {
    it('should create a new allocation and return 201 status code', async () => {
        const res = await request(app)
            .post('/api/allocations/')
            .send({
                name: 'Test Allocation',
                resource: 'Test Resource',
                amount: 10,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('resource');
        expect(res.body).toHaveProperty('amount');
        createdAllocationId = res.body._id;
    });
});

// Test GET by ID
describe('GET /api/allocations/:id', () => {
    it('should get the allocation by id and return 200 status code', async () => {
        const res = await request(app)
            .get(`/api/allocations/${createdAllocationId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
    });
});

// Test PUT
describe('PUT /api/allocations/:id', () => {
    it('should update the allocation by id and return 200 status code', async () => {
        const res = await request(app)
            .put(`/api/allocations/${createdAllocationId}`)
            .send({
                amount: 20,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.amount).toEqual(20);
    });
});

// Test DELETE
describe('DELETE /api/allocations/:id', () => {
    it('should delete the allocation by id and return 204 status code', async () => {
        const res = await request(app)
            .delete(`/api/allocations/${createdAllocationId}`);
        expect(res.statusCode).toEqual(204);
    });
});
