import mongoose, { Schema } from 'mongoose';

// Define the nested object schema
const NestedObjectSchema = new Schema({
  field1: { type: String, required: true },
  field2: { type: Number, required: true },
});

// Define the entity schema with the required fields
const entitySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    attribute: { type: String, required: true },
    type: {
      type: String,
      enum: ['Type1', 'Type2', 'Type3'],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    nestedObject: { type: NestedObjectSchema, required: true },
  },
  {
    timestamps: true,
  }
);

// Create the Entity model from the schema and export it
export const Entity = mongoose.model('Entity', entitySchema);
