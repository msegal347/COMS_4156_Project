import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../../src/index';
import { beforeAll, afterAll } from '@jest/globals';

let createdResourceId: string;

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
describe('POST /api/resources/', () => {
    it('should create a new resource and return 201 status code', async () => {
        const res = await request(app)
            .post('/api/resources/')
            .send({
                name: 'Test Resource',
                type: 'Test Type',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name');
        createdResourceId = res.body._id;
    });
});

// Test GET
describe('GET /api/resources/', () => {
    it('should get all resources and return 200 status code', async () => {
        const res = await request(app)
            .get('/api/resources/');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});

// Test GET by ID
describe('GET /api/resources/:id', () => {
    it('should get the resource by id and return 200 status code', async () => {
        const res = await request(app)
            .get(`/api/resources/${createdResourceId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
    });
});

// Test PUT
describe('PUT /api/resources/:id', () => {
    it('should update the resource by id and return 200 status code', async () => {
        const res = await request(app)
            .put(`/api/resources/${createdResourceId}`)
            .send({
                name: 'Updated Resource Name',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Updated Resource Name');
    });
});

// Test DELETE
describe('DELETE /api/resources/:id', () => {
    it('should delete the resource by id and return 204 status code', async () => {
        const res = await request(app)
            .delete(`/api/resources/${createdResourceId}`);
        expect(res.statusCode).toEqual(204);
    });
});
