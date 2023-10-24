import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../../src/index'; 
import { beforeAll, afterAll } from '@jest/globals';

let createdEntityId: string;

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
describe('POST /api/entities/', () => {
    it('should create a new entity and return 201 status code', async () => {
        const res = await request(app)
            .post('/api/entities/')
            .send({
                name: 'EntityName',
                attribute: 'Attribute1',
                type: 'Type1',
                isActive: true,
                nestedObject: {
                    field1: 'Field1',
                    field2: 1
                }
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name');
        createdEntityId = res.body._id;
    });
});

// Test GET by ID
describe('GET /api/entities/:id', () => {
    it('should get the entity by id and return 200 status code', async () => {
        const res = await request(app)
            .get(`/api/entities/${createdEntityId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
    });
});

// Test PUT
describe('PUT /api/entities/:id', () => {
    it('should update the entity by id and return 200 status code', async () => {
        const res = await request(app)
            .put(`/api/entities/${createdEntityId}`)
            .send({
                name: 'UpdatedEntityName',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('UpdatedEntityName');
    });
});

// Test DELETE
describe('DELETE /api/entities/:id', () => {
    it('should delete the entity by id and return 204 status code', async () => {
        const res = await request(app)
            .delete(`/api/entities/${createdEntityId}`);
        expect(res.statusCode).toEqual(204);
    });
});

// Test GET all
describe('GET /api/entities/', () => {
    it('should get all entities and return 200 status code', async () => {
        const res = await request(app)
            .get('/api/entities/');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
