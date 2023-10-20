import mongoose, { Document, Schema } from 'mongoose';

// Extend the default mongoose Document interface to include the required fields
export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: string;
}

// Create the Transaction schema with the required fields
const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
});

// Create the Transaction model from the schema
const Transaction =  mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;