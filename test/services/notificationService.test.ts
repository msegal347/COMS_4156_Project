import { notificationService } from '../../src/services/notificationService';
import NotificationModel, { INotification } from '../../src/models/notificationModel';

// Mock the NotificationModel class
jest.mock('../../src/models/notificationModel');

describe('NotificationService', () => {
  it('should call NotificationService.createNotification and return the result', async () => {
    // Mock data and result
    const mockData = { userId: 'userId', content: 'content', read: false };
    const mockResult = { userId: 'userId', content: 'content', read: false, save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    // Mock the NotificationModel constructor to return an instance with a mock save method
    (NotificationModel as jest.MockedClass<typeof NotificationModel>).mockImplementation(() => {
      return mockResult as any;
    });

    // Perform the test
    const result = await notificationService.createNotification(mockData);

    // Assertions
    expect(result).toEqual(mockResult);
  });

  it('should get a notification by userID for a user', async () => {
    // Mock data and result
    const mockData = { userId: 'userId', content: 'content', read: false };
    const mockResult = { userId: 'userId', content: 'content', read: false, save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    NotificationModel.find = jest.fn().mockResolvedValue(mockData);

    const result = await notificationService.getNotifications('userId');

    // Assertions
    expect(result).toEqual(mockData);
  });

  // Should update a notification by ID
  it('should update a notification by ID', async () => {
    // Mock data and result
    const mockData = { userId: 'userId', content: 'content', read: false };
    const mockResult = { userId: 'userId', content: 'content', read: false, save: jest.fn() };

    // Mock the save method to resolve the promise with mockResult
    mockResult.save.mockResolvedValueOnce(mockResult);

    NotificationModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockData);

    const result = await notificationService.updateNotification('1', mockData);

    expect(result).toEqual(mockData);
  });

  // Should delete a notification by ID
  it('should delete a notification by ID', async () => {
    NotificationModel.findByIdAndDelete = jest.fn().mockResolvedValue(true);

    const result = await notificationService.deleteNotification('1');

    expect(result).toBeTruthy();
  });

});

