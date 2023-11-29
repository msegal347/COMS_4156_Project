import mongoose, { Document, Schema } from 'mongoose';

interface IRequestMaterial {
  materialId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface IRequest extends Document {
  materials: IRequestMaterial[];
  createdAt: Date;
  updatedAt: Date;
}

const requestMaterialSchema: Schema = new Schema({
  materialId: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
  quantity: { type: Number, required: true }
});

const requestSchema: Schema = new Schema({
  materials: [requestMaterialSchema],
}, {
  timestamps: true
});

const Request = mongoose.model<IRequest>('Request', requestSchema);

export default Request;
