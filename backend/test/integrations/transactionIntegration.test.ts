import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../../src/index';
import { beforeAll, afterAll } from '@jest/globals';

let createdTransactionId: string;
const testUserId = new mongoose.Types.ObjectId();

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
describe('POST /api/transactions/', () => {
    it('should create a new transaction and return 201 status code', async () => {
        const res = await request(app)
            .post('/api/transactions/')
            .send({
                userId: testUserId,
                amount: 100,
                type: 'credit',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('amount');
        createdTransactionId = res.body._id;
    });
});

// Test GET by ID
describe('GET /api/transactions/:id', () => {
    it('should get the transaction by id and return 200 status code', async () => {
        const res = await request(app)
            .get(`/api/transactions/${createdTransactionId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('amount');
    });
});

// Test GET by User ID
describe('GET /api/transactions/user/:userId', () => {
    it('should get all transactions for a user and return 200 status code', async () => {
        const res = await request(app)
            .get(`/api/transactions/user/${testUserId}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});

// Test PUT
describe('PUT /api/transactions/:id', () => {
    it('should update the transaction by id and return 200 status code', async () => {
        const res = await request(app)
            .put(`/api/transactions/${createdTransactionId}`)
            .send({
                amount: 200,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.amount).toEqual(200);
    });
});

// Test DELETE
describe('DELETE /api/transactions/:id', () => {
    it('should delete the transaction by id and return 204 status code', async () => {
        const res = await request(app)
            .delete(`/api/transactions/${createdTransactionId}`);
        expect(res.statusCode).toEqual(204);
    });
});
