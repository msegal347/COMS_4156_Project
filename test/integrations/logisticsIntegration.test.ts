import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../../src/index';
import { beforeAll, afterAll } from '@jest/globals';

let createdRouteId: string;

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
describe('POST /api/logistics/', () => {
    it('should create a new logistics route and return 201 status code', async () => {
        const res = await request(app)
            .post('/api/logistics/')
            .send({
                origin: 'New York',
                destinations: ['San Francisco', 'Los Angeles'],
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('origin');
        createdRouteId = res.body._id;
    });
});

// Test GET by ID
describe('GET /api/logistics/:id', () => {
    it('should get the logistics route by id and return 200 status code', async () => {
        const res = await request(app)
            .get(`/api/logistics/${createdRouteId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('origin');
    });
});

// Test PUT
describe('PUT /api/logistics/:id', () => {
    it('should update the logistics route by id and return 200 status code', async () => {
        const res = await request(app)
            .put(`/api/logistics/${createdRouteId}`)
            .send({
                origin: 'Updated Origin',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.origin).toEqual('Updated Origin');
    });
});

// Test DELETE
describe('DELETE /api/logistics/:id', () => {
    it('should delete the logistics route by id and return 204 status code', async () => {
        const res = await request(app)
            .delete(`/api/logistics/${createdRouteId}`);
        expect(res.statusCode).toEqual(204);
    });
});
