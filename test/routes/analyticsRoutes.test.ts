import request from 'supertest';
import { app, server } from '../../src/index';
import * as AnalyticsService from '../../src/services/analyticsService';

// Mocking AnalyticsService
jest.mock('../../src/services/analyticsService');

jest.mock('../../src/config/db', () => {
  return jest.fn();  // mock connectDB as a function that does nothing
});

describe('Analytics Records', () => {
  
  it('should create a new record', async () => {
    const mockRecord = { data: 'data' };
    (AnalyticsService.createRecord as jest.Mock).mockResolvedValue(mockRecord);
    
    const res = await (request(app) as any)
        .post('/api/analytics')
        .send(mockRecord);
        
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockRecord);
  });
  
  it('should get a record by ID', async () => {
    const mockRecord = { id: '1', data: 'data' };
    (AnalyticsService.getRecordById as jest.Mock).mockResolvedValue(mockRecord);

    const res = await (request(app) as any)
        .get('/api/analytics/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockRecord);
  });
  
  it('should update a record by ID', async () => {
    const updatedRecord = { id: '1', data: 'updated' };
    (AnalyticsService.updateRecordById as jest.Mock).mockResolvedValue(updatedRecord);

    const res = await (request(app) as any)
        .put('/api/analytics/1')
        .send(updatedRecord);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedRecord);
  });

  it('should delete a record by ID', async () => {
    (AnalyticsService.deleteRecordById as jest.Mock).mockResolvedValue(true);

    const res = await (request(app) as any)
        .delete('/api/analytics/1');

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



