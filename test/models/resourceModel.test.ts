import mongoose from 'mongoose';
import ResourceModel from '../../src/models/resourceModel';

describe('ResourceModel', () => {
  it('should have the correct schema', () => {
    const schemaKeys = Object.keys(ResourceModel.schema.paths);
    const expectedKeys = [
      'category',
      'quantity',
      '_id',
      '__v', // This field is automatically created by Mongoose
      'createdAt', // These are from the timestamp option
      'updatedAt',
    ];
    expect(schemaKeys).toEqual(expect.arrayContaining(expectedKeys));
  });

  it('should set timestamps', () => {
    const schema = ResourceModel.schema as mongoose.Schema & {
      options: {
        timestamps: boolean;
      };
    };
    expect(schema.options.timestamps).toBeTruthy();
  });

  it('should have category as a required field', () => {
    const isNameRequired = ResourceModel.schema.path('category').isRequired;
    expect(isNameRequired).toBeTruthy();
  });

  it('should have quantity as a required field', () => {
    const isTypeRequired = ResourceModel.schema.path('quantity').isRequired;
    expect(isTypeRequired).toBeTruthy();
  });
});
