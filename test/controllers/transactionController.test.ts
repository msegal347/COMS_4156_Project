import { transactionService } from '../../src/services/transactionService';
import { transactionController } from '../../src/controllers/transactionController'; // Import the whole object
import { mockRequest, mockResponse, mockNext } from '../../src/utils/expressMock';

jest.mock('../../src/services/transactionService');

describe('TransactionController', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    req.params = {};
  });

    it('should create a new transaction', async () => {
    const newTransaction = { userId: '1', amount: 100, type: 'credit' };
    (transactionService.createTransaction as jest.Mock).mockResolvedValue(newTransaction);

    await transactionController.createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newTransaction);
    });

    it('should get a transaction by ID', async () => {
        const transaction = { id: '1', userId: '1', amount: 100, type: 'credit' };
        (transactionService.getTransactionById as jest.Mock).mockResolvedValue(transaction);

        req.params.id = '1';

        await transactionController.getTransactionById(req, res);

        expect(transactionService.getTransactionById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(transaction);
    });

    it('should get transactions by userId', async () => {
    const transactions = [
        { id: '1', userId: '1', amount: 100, type: 'credit' },
        { id: '2', userId: '1', amount: 150, type: 'debit' }
    ];
    (transactionService.getTransactionsByUserId as jest.Mock).mockResolvedValue(transactions);

    req.params.userId = '1';

    await transactionController.getTransactionsByUserId(req, res);

    expect(transactionService.getTransactionsByUserId).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(transactions);
    });

    it('should update a transaction by ID', async () => {
    const updatedTransaction = { id: '1', userId: '1', amount: 150, type: 'debit' };
    req.params.id = '1'; 
    (transactionService.updateTransaction as jest.Mock).mockResolvedValue(updatedTransaction);

    await transactionController.updateTransaction(req, res);

    expect(transactionService.updateTransaction).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTransaction);
    });

    it('should delete a transaction by ID', async () => {
    req.params.id = '1'; 
    (transactionService.deleteTransaction as jest.Mock).mockResolvedValue(true);

    await transactionController.deleteTransaction(req, res);

    expect(transactionService.deleteTransaction).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    });


    it('should return 400 for invalid input during transaction creation', async () => {
    (transactionService.createTransaction as jest.Mock).mockRejectedValue(new Error('Invalid input'));

    await transactionController.createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
    });

    it('should return 400 for invalid input during transaction update', async () => {
    req.params.id = '1';
    (transactionService.updateTransaction as jest.Mock).mockRejectedValue(new Error('Invalid input'));

    await transactionController.updateTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
    });


});
