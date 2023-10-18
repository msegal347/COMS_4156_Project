import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  type: string;
}

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
