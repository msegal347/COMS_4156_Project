import request from 'supertest';
import { app, server } from '../../src/index';
import * as TransactionService from '../../src/services/transactionService';
import { Types } from 'mongoose';

// Mocking LogisticsService
jest.mock('../../src/services/transactionService');

jest.mock('../../src/config/db', () => {
  return jest.fn();  // mock connectDB as a function that does nothing
});


describe('Transaction Routes', async () => {
    it('should create a new transaction', async () => {
        const mockUserId = new Types.ObjectId(1);
        const mockTransaction = { userId: mockUserId, amount: 100, type: "credit"};
        (TransactionService.transactionService.createTransaction as jest.Mock).mockResolvedValue(mockTransaction);
        
        const res = await (request(app) as any)
            .post('/api/transaction')
            .send(mockTransaction);
            
        expect(res.status).toBe(201);
        expect(res.body).toEqual(mockTransaction);
    });

    it('should get a transaction by userId', async () => {
        const mockUserId = new Types.ObjectId(1);
        const mockTransaction = { userId: mockUserId, amount: 100, type: "credit"};
        (TransactionService.transactionService.getTransactionsByUserId as jest.Mock).mockResolvedValue(mockTransaction);
    
        const res = await (request(app) as any)
            .get('/api/transaction/userId');
    
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockTransaction);
      });
      
      it('should get a transaction by productId', async () => {
        const mockUserId = new Types.ObjectId(1);
        const mockTransaction = { userId: mockUserId, amount: 100, type: "credit"};
        (TransactionService.transactionService.getTransactionById as jest.Mock).mockResolvedValue(mockTransaction);
    
        const res = await (request(app) as any)
            .get('/api/transaction/id');
    
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockTransaction);
      });

      it('should update a transaction by ID', async () => {
        const mockUserId = new Types.ObjectId(1);
        const updatedTransaction = { userId: mockUserId, amount: 100, type: "credit"};
        (TransactionService.transactionService.updateTransaction as jest.Mock).mockResolvedValue(updatedTransaction);
    
        const res = await (request(app) as any)
            .put('/api/transaction/1')
            .send(updatedTransaction);
    
        expect(res.status).toBe(200);
        expect(res.body).toEqual(updatedTransaction);
      });
    
      it('should delete a transaction by ID', async () => {
        (TransactionService.transactionService.deleteTransaction as jest.Mock).mockResolvedValue(true);
    
        const res = await (request(app) as any)
            .delete('/api/transaction/1');
    
        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
      });

    afterAll((done) => {
        if (server) {
          server.close(done);
        } else {
          done();
        }
      });
});