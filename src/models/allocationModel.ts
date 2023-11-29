import mongoose from 'mongoose';

interface IAllocation extends mongoose.Document {
  sourceId: mongoose.Schema.Types.ObjectId;
  sinkId: mongoose.Schema.Types.ObjectId;
  allocatedQuantity: number;
}

const allocationSchema = new mongoose.Schema({
  sourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
  sinkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
  allocatedQuantity: { type: Number, required: true },
}, {
  timestamps: true
});

export const Allocation = mongoose.model<IAllocation>('Allocation', allocationSchema);
