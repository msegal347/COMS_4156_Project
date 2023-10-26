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
  
});

