import { notificationService } from '../../src/services/notificationService';
import { notificationController } from '../../src/controllers/notificationController';

import { mockRequest, mockResponse, mockNext } from '../../src/utils/expressMock';

jest.mock('../../src/services/notificationService');

describe('NotificationController', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    req.params = {}; 
  });

  it('should create a new notification', async () => {
    const newNotification = { userId: 'userId', content: 'content', read: false };
    (notificationService.createNotification as jest.Mock).mockResolvedValue(newNotification);

    await notificationController.createNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newNotification);
  });

  it('should get a notification by ID', async () => {
    const notification = { id: '1', userId: 'userId', content: 'content', read: false };
    (notificationService.getNotifications as jest.Mock).mockResolvedValue(notification);
  
    // Initialize params if it is undefined
    req.params = req.params || {};
    req.params.id = '1'; // Now this should work without any issue
  
    await notificationController.getNotifications(req, res);
  
    // Debugging lines
    if (!res.status.mock.calls.length) console.log('res.status was never called');
    if (next.mock.calls.length) console.log('next was called with:', next.mock.calls[0][0]);
  
    expect(notificationService.getNotifications).toHaveBeenCalled();  // New line to check if service method was called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(notification);
  });
  
  

  it('should update a notification by ID', async () => {
    const updatedNotification = { id: '1', userId: 'userId', content: 'updated', read: false };
    req.params.id = '1';  // Set the ID
    (notificationService.updateNotification as jest.Mock).mockResolvedValue(updatedNotification);
    
    await notificationController.updateNotification(req, res);

    if (!res.status.mock.calls.length) {
      console.log('res.status was never called');
    }
    if (next.mock.calls.length) {
      console.log('next was called with:', next.mock.calls[0][0]);
    }

    expect(notificationService.updateNotification).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedNotification);
  });

  it('should delete a notification by ID', async () => {
    req.params.id = '1';  // Set the ID
    (notificationService.deleteNotification as jest.Mock).mockResolvedValue(true);
    
    await notificationController.deleteNotification(req, res);

    if (!res.status.mock.calls.length) {
      console.log('res.status was never called');
    }
    if (next.mock.calls.length) {
      console.log('next was called with:', next.mock.calls[0][0]);
    }

    expect(notificationService.deleteNotification).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({});
  });
});
