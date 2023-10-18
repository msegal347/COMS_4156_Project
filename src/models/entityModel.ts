import mongoose, { Schema } from 'mongoose';

const NestedObjectSchema = new Schema({
  field1: { type: String, required: true },
  field2: { type: Number, required: true }
});

const entitySchema = new Schema({
  name: { type: String, required: true, unique: true },
  attribute: { type: String, required: true },
  type: {
    type: String,
    enum: ['Type1', 'Type2', 'Type3'],
    required: true
  },
  isActive: { type: Boolean, default: true },
  nestedObject: { type: NestedObjectSchema, required: true },
},
{
  timestamps: true
});

export const Entity = mongoose.model('Entity', entitySchema);
