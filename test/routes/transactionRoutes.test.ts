import express from 'express';
import request from 'supertest';
import * as TransactionService from '../../src/services/transactionService';
import transactionRoutes from '../../src/routes/transactionRoutes';
import { Types } from 'mongoose';

jest.mock('../../src/services/transactionService');
jest.mock('../../src/config/db', () => {
  return jest.fn();
});

const app = express();
app.use(express.json());
app.use('/api/transaction', transactionRoutes);

describe('Transaction Routes', () => {
  it('should create a new transaction', async () => {
    const mockUserId = new Types.ObjectId().toHexString();
    const mockTransaction = { userId: mockUserId, amount: 100, type: "credit" };
    (TransactionService.transactionService.createTransaction as jest.Mock).mockResolvedValue(mockTransaction);

    const res = await request(app)
      .post('/api/transaction')
      .send(mockTransaction);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockTransaction);
  });

  it('should get a transaction by userId', async () => {
    const mockUserId = new Types.ObjectId().toHexString();
    const mockTransaction = { userId: mockUserId, amount: 100, type: "credit" };
    (TransactionService.transactionService.getTransactionsByUserId as jest.Mock).mockResolvedValue(mockTransaction);
  
    const res = await request(app)
      .get(`/api/transaction/user/${mockUserId}`);
  
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTransaction);
  });
  
  it('should get a transaction by productId', async () => {
    const mockUserId = new Types.ObjectId();
    const mockTransaction = { userId: mockUserId.toHexString(), amount: 100, type: "credit" };
    (TransactionService.transactionService.getTransactionById as jest.Mock).mockResolvedValue(mockTransaction);
  
    const res = await request(app)
      .get('/api/transaction/id');
  
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTransaction);
  });

  it('should update a transaction by ID', async () => {
    const mockUserId = new Types.ObjectId();
    const updatedTransaction = { userId: mockUserId.toHexString(), amount: 100, type: "credit" };
    (TransactionService.transactionService.updateTransaction as jest.Mock).mockResolvedValue(updatedTransaction);
  
    const res = await request(app)
      .put('/api/transaction/1')
      .send(updatedTransaction);
  
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedTransaction);
  });

  it('should delete a transaction by ID', async () => {
    (TransactionService.transactionService.deleteTransaction as jest.Mock).mockResolvedValue(true);
  
    const res = await request(app)
      .delete('/api/transaction/1');
  
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });
});