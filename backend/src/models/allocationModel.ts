// src/models/allocationModel.ts
import mongoose from 'mongoose';

// Define the allocation schema with the required fields
const allocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  resource: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Create the Allocation model from the schema and export it
export const Allocation = mongoose.model('Allocation', allocationSchema);
