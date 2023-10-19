import mongoose from 'mongoose';
import AnalyticsModel from '../../src/models/analyticsModel';
import "@jazzer.js/jest-runner/jest-extension";

describe('AnalyticsModel', () => {
  it.fuzz('should have the correct schema', () => {
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

  it.fuzz('should set timestamps', () => {
    expect((AnalyticsModel.schema as any).options.timestamps).toBeTruthy();
  });

  it.fuzz('should have data as a required field', () => {
    const isDataRequired = (AnalyticsModel.schema.path('data') as any).isRequired;
    expect(isDataRequired).toBeTruthy();
  });
});
