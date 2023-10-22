import mongoose from 'mongoose';
import ResourceModel from '../../src/models/resourceModel';

describe('ResourceModel', () => {
  it('should have the correct schema', () => {
    const schemaKeys = Object.keys(ResourceModel.schema.paths);
    const expectedKeys = [
      'name',
      'type',
      '_id',
      '__v', // This field is automatically created by Mongoose
      'createdAt', // These are from the timestamp option
      'updatedAt',
    ];
    expect(schemaKeys).toEqual(expect.arrayContaining(expectedKeys));
  });

  it('should set timestamps', () => {
    expect(ResourceModel.schema.options.timestamps).toBeTruthy();
  });

  it('should have name as a required field', () => {
    const isNameRequired = ResourceModel.schema.path('name').isRequired;
    expect(isNameRequired).toBeTruthy();
  });

  it('should have type as a required field', () => {
    const isTypeRequired = ResourceModel.schema.path('type').isRequired;
    expect(isTypeRequired).toBeTruthy();
  });
});
