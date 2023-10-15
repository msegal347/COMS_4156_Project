import mongoose from 'mongoose';
import LogisticsModel from '../../src/models/logisticsModel';

jest.mock('mongoose');

describe('LogisticsModel', () => {
  
  it('should have the correct schema', () => {
    const schemaKeys = Object.keys(LogisticsModel.schema.paths);
    const expectedKeys = [
      'origin', 
      'destinations', 
      'optimalRoute', 
      'status', 
      '_id', 
      '__v',  // This field is automatically created by Mongoose
      'createdAt', // These are from the timestamp option
      'updatedAt'
    ];
    
    expect(schemaKeys).toEqual(expect.arrayContaining(expectedKeys));
  });
  
it('should set timestamps', () => {
    expect((LogisticsModel.schema as any).options.timestamps).toBeTruthy();
});

it('should have origin as a required field', () => {
    const isOriginRequired = LogisticsModel.schema.path('origin').isRequired;
    expect(isOriginRequired).toBeTruthy();
});

it('should have the correct default status', () => {
    const defaultStatus = LogisticsModel.schema.path('status').default;
    expect(defaultStatus).toBe('scheduled');
});

it('should have the correct enum values for status', () => {
    const statusEnum = LogisticsModel.schema.path('status').options.enum;
    expect(statusEnum).toEqual(['scheduled', 'in_transit', 'completed', 'cancelled']);
});

it('should have optimalRoute as an optional field', () => {
    const isOptimalRouteRequired = LogisticsModel.schema.path('optimalRoute').isRequired;
    expect(isOptimalRouteRequired).toBeFalsy();
});
  
});
