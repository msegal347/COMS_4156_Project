import request from 'supertest';
import { app, server } from '../../src/index';
import { notificationService } from '../../src/services/notificationService';

// Mocking notificationService
jest.mock('../../src/services/notificationService');

jest.mock('../../src/config/db', () => {
  return jest.fn();  // mock connectDB as a function that does nothing
});

describe('Notifications', () => {
  
  it('should create a new notification', async () => {
    const mockNotification = { userId: 'userId', content: 'content', read: false };
    (notificationService.createNotification as jest.Mock).mockResolvedValue(mockNotification);
    
    const res = await (request(app) as any)
        .post('/api/notification')
        .send(mockNotification);
        
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockNotification);
  });
  
  it('should get a notification by userId', async () => {
    const mockNotification = { id: '1', userId: 'userId', content: 'content', read: false };
    (notificationService.getNotifications as jest.Mock).mockResolvedValue(mockNotification);

    const res = await (request(app) as any)
        .get('/api/notification/userId');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockNotification);
  });
  
  it('should update a notification by ID', async () => {
    const updatedNotification = { id: '1', userId: 'userId', content: 'updated', read: false };
    (notificationService.updateNotification as jest.Mock).mockResolvedValue(updatedNotification);

    const res = await (request(app) as any)
        .put('/api/notification/1')
        .send(updatedNotification);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedNotification);
  });

  it('should delete a notification by ID', async () => {
    (notificationService.deleteNotification as jest.Mock).mockResolvedValue(true);

    const res = await (request(app) as any)
        .delete('/api/notification/1');

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });
  
  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
  
});



