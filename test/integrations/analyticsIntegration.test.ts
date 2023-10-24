import request from 'supertest';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../../src/index'; 
import { beforeAll, afterAll } from '@jest/globals';

let createdRecordId: string;

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
    // Disconnect from the database
    await mongoose.connection.close();
});

// Test case for POST
describe('POST /api/analytics/', () => {
  it('should create a new analytics record and return 201 status code', async () => {
    const res = await request(app)
      .post('/api/analytics/')
      .send({
        data: {
          metric1: 'value1',
          metric2: 'value2',
        },
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    createdRecordId = res.body._id;
  });
});

// Test case for GET
describe('GET /api/analytics/:id', () => {
  it('should fetch the analytics record by id and return 200 status code', async () => {
    const res = await request(app)
      .get(`/api/analytics/${createdRecordId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});

// Test case for PUT
describe('PUT /api/analytics/:id', () => {
  it('should update the analytics record by id and return 200 status code', async () => {
    const res = await request(app)
      .put(`/api/analytics/${createdRecordId}`)
      .send({
        data: {
          metric1: 'updatedValue1',
          metric2: 'updatedValue2',
        },
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.metric1).toEqual('updatedValue1');
    expect(res.body.data.metric2).toEqual('updatedValue2');
  });
});

// Test case for DELETE
describe('DELETE /api/analytics/:id', () => {
  it('should delete the analytics record by id and return 204 status code', async () => {
    const res = await request(app)
      .delete(`/api/analytics/${createdRecordId}`);

    expect(res.statusCode).toEqual(204);
  });
});
