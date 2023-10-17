// src/models/allocationModel.ts
import mongoose from 'mongoose';

const allocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  resource: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const Allocation = mongoose.model('Allocation', allocationSchema);
