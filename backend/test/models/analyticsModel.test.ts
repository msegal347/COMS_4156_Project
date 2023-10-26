import mongoose from 'mongoose';
import AnalyticsModel from '../../src/models/analyticsModel';

describe('AnalyticsModel', () => {
  it('should have the correct schema', () => {
    const schemaKeys = Object.keys(AnalyticsModel.schema.paths);
    const expectedKeys = [
      'data',
      '_id',
      '__v', // This field is automatically created by Mongoose
      'createdAt', // These are from the timestamp option
      'updatedAt',
    ];
    expect(schemaKeys).toEqual(expect.arrayContaining(expectedKeys));
  });

  it('should set timestamps', () => {
    expect((AnalyticsModel.schema as any).options.timestamps).toBeTruthy();
  });

  it('should have data as a required field', () => {
    const isDataRequired = (AnalyticsModel.schema.path('data') as any).isRequired;
    expect(isDataRequired).toBeTruthy();
  });
});
