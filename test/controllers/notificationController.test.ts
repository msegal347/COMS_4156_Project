import { notificationController } from '../../src/controllers/notificationController';
import Notification from '../../src/models/notificationModel';

import { mockRequest, mockResponse, mockNext } from '../../src/utils/expressMock';

// Mocking the Notification model methods
jest.mock('../../src/models/notificationModel');

describe('NotificationController', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    req.params = {};

    // Reset all mock behaviors
    jest.clearAllMocks();
  });

  it('should create a new notification', async () => {
    const newNotification = { userId: 'userId', content: 'content', read: false };
    req.body = newNotification;
    (Notification.prototype.save as jest.Mock).mockResolvedValue(newNotification);

    await notificationController.createNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newNotification);
  });

  it('should get notifications by userId', async () => {
    const notifications = [
      { userId: 'userId', content: 'content1', read: false },
      { userId: 'userId', content: 'content2', read: true },
    ];
    req.params.userId = 'userId';
    (Notification.find as jest.Mock).mockResolvedValue(notifications);

    await notificationController.getNotifications(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(notifications);
  });

  it('should update a notification by ID', async () => {
    const updatedNotification = { userId: 'userId', content: 'updatedContent', read: true };
    req.params.id = '1';
    req.body = updatedNotification;
    (Notification.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedNotification);

    await notificationController.updateNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedNotification);
  });

  it('should delete a notification by ID', async () => {
    req.params.id = '1';
    (Notification.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

    await notificationController.deleteNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: 'Notification deleted' });
  });

  it('should handle errors during notification creation', async () => {
    const errorMessage = 'Database error';
    req.body = {};
    (Notification.prototype.save as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await notificationController.createNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should handle errors during getting notifications', async () => {
    const errorMessage = 'Database error';
    req.params.userId = 'userId';
    (Notification.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await notificationController.getNotifications(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should handle errors during notification update', async () => {
    const errorMessage = 'Database error';
    req.params.id = '1';
    req.body = {};
    (Notification.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await notificationController.updateNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should handle notification not found during update', async () => {
    req.params.id = '1';
    req.body = {};
    (Notification.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await notificationController.updateNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Notification not found' });
  });

  it('should handle errors during notification deletion', async () => {
    const errorMessage = 'Database error';
    req.params.id = '1';
    (Notification.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await notificationController.deleteNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should handle notification not found during deletion', async () => {
    req.params.id = '1';
    (Notification.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await notificationController.deleteNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Notification not found' });
  });
});
