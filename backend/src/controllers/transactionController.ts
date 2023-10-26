import { Request, Response } from 'express';
import { transactionService } from '../services/transactionService';

export const transactionController = {
  // Create a new transaction
  async createTransaction(req: Request, res: Response) {
    try {
      const transaction = await transactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // Retrieve a specific transaction by its ID
  async getTransactionById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // Retrieve all transactions for a specific user
  async getTransactionsByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const transactions = await transactionService.getTransactionsByUserId(userId);
      res.status(200).json(transactions);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // Update a specific transaction by its ID
  async updateTransaction(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const updates = req.body;
      const transaction = await transactionService.updateTransaction(id, updates);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // Delete a specific transaction by its ID
  async deleteTransaction(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const success = await transactionService.deleteTransaction(id);
      if (!success) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },
};
