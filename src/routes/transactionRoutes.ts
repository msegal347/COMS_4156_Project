import express from 'express';
import { transactionController } from '../controllers/transactionController';

const router = express.Router();

// Create a new transaction
router.post('/', transactionController.createTransaction);

// Retrieve a specific transaction by its ID
router.get('/:id', transactionController.getTransactionById);

// Retrieve all transactions for a specific user
router.get('/user/:userId', transactionController.getTransactionsByUserId);

// Retrieve all transactions
router.get('/', transactionController.getAllTransactions);

// Update a transaction
router.put('/:id', transactionController.updateTransaction);

// Delete a transaction
router.delete('/:id', transactionController.deleteTransaction);

export default router;
