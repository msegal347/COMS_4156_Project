import mongoose, { Document, Schema } from 'mongoose';

export interface IRequestMaterial extends mongoose.Document {
  materialId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  fulfilled?: boolean;
  remainingQuantity?: number;
}

export interface IRequest extends Document {
  materials: IRequestMaterial[];
  createdAt: Date;
  updatedAt: Date;
}

const requestMaterialSchema = new mongoose.Schema({
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
  quantity: { type: Number, required: true },
  fulfilled: { type: Boolean, default: false },
  remainingQuantity: { type: Number },
});

const requestSchema: Schema = new Schema(
  {
    materials: [requestMaterialSchema],
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model<IRequest>('Request', requestSchema);

export default Request;
