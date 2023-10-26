import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../../src/index';  
import { beforeAll, afterAll } from '@jest/globals';

let createdNotificationId: string;
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
describe('POST /api/notifications/', () => {
    it('should create a new notification and return 201 status code', async () => {
        const res = await request(app)
            .post('/api/notifications/')
            .send({
                userId: testUserId,
                content: 'Test Content',
                read: false,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('content');
        createdNotificationId = res.body._id;
    });
});

// Test GET by user ID
describe('GET /api/notifications/:userId', () => {
    it('should get all notifications for a user and return 200 status code', async () => {
        const res = await request(app)
            .get(`/api/notifications/${testUserId}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});

// Test PUT
describe('PUT /api/notifications/:id', () => {
    it('should update the notification by id and return 200 status code', async () => {
        const res = await request(app)
            .put(`/api/notifications/${createdNotificationId}`)
            .send({
                read: true,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.read).toEqual(true);
    });
});

// Test DELETE
describe('DELETE /api/notifications/:id', () => {
    it('should delete the notification by id and return 204 status code', async () => {
        const res = await request(app)
            .delete(`/api/notifications/${createdNotificationId}`);
        expect(res.statusCode).toEqual(204);
    });
});
