import Transaction, { ITransaction } from '../models/transactionModel';

export const transactionService = {
  // Create a new transaction
  async createTransaction(data: ITransaction): Promise<ITransaction> {
    const transaction = new Transaction(data);
    return await transaction.save();
  },

  // Retrieve a specific transaction by its ID
  async getTransactionById(id: string): Promise<ITransaction | null> {
    return await Transaction.findById(id);
  },

  // Retrieve all transactions for a specific user
  async getTransactionsByUserId(userId: string): Promise<ITransaction[]> {
    return await Transaction.find({ userId });
  },

  // Update a specific transaction
  async updateTransaction(
    id: string,
    updates: Partial<ITransaction>
  ): Promise<ITransaction | null> {
    return await Transaction.findByIdAndUpdate(id, updates, { new: true });
  },

  // Delete a transaction
  async deleteTransaction(id: string): Promise<boolean> {
    const result = await Transaction.findByIdAndDelete(id);
    return result !== null;
  },
};
