import mongoose from 'mongoose';
import NotificationModel from '../../src/models/notificationModel';

describe('NotificationModel', () => {
  it('should have the correct schema', () => {
    const schemaKeys = Object.keys(NotificationModel.schema.paths);
    const expectedKeys = [
      'userId',
      'content',
      'read',
      '_id',
      '__v', // This field is automatically created by Mongoose
      'createdAt', // These are from the timestamp option
      'updatedAt',
    ];
    expect(schemaKeys).toEqual(expect.arrayContaining(expectedKeys));
  });

  it('should set timestamps', () => {
    expect((NotificationModel.schema as any).options.timestamps).toBeTruthy();
  });

  it('should have userId as a required field', () => {
    const isUserIdRequired = (NotificationModel.schema.path('userId') as any).isRequired;
    expect(isUserIdRequired).toBeTruthy();
  });

  it('should have content as a required field', () => {
    const isContentRequired = (NotificationModel.schema.path('content') as any).isRequired;
    expect(isContentRequired).toBeTruthy();
  });

  it('should have default value of read be false', () => {
    const readDefaultValue = (NotificationModel.schema.path('read') as any).default();
    expect(readDefaultValue).toBeFalsy();
  });

  it('should throw a validation error if userId is missing', async () => {
    const invalidNotification = new NotificationModel({
      content: 'Some content'
    });

    await expect(invalidNotification.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should throw a validation error if content is missing', async () => {
    const invalidNotification = new NotificationModel({
      userId: 'SomeUserId'
    });

    await expect(invalidNotification.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should throw a validation error if userId is not a string', async () => {
    const invalidNotification = new NotificationModel({
      userId: 12345,
      content: 'Some content'
    });

    await expect(invalidNotification.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should throw a validation error if content is not a string', async () => {
    const invalidNotification = new NotificationModel({
      userId: 'SomeUserId',
      content: 12345
    });

    await expect(invalidNotification.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it('should throw a validation error if read is not a boolean', async () => {
    const invalidNotification = new NotificationModel({
      userId: 'SomeUserId',
      content: 'Some content',
      read: 'NotABoolean'
    });

    await expect(invalidNotification.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });
});
