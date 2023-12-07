import mongoose from 'mongoose';

interface IAllocation extends mongoose.Document {
  sourceId: mongoose.Schema.Types.ObjectId;
  sinkId: mongoose.Schema.Types.ObjectId;
  allocatedQuantity: number;
}

const allocationSchema = new mongoose.Schema(
  {
    // Update the ref to 'User' for both sourceId and sinkId
    sourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sinkId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    allocatedQuantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Allocation = mongoose.model<IAllocation>('Allocation', allocationSchema);

