import request from 'supertest';
import { app } from '../../src/index';
import * as LogisticsService from '../../src/services/logisticsService';

jest.mock('../../src/services/logisticsService');

describe('Logistics Routes', () => {
  
  it('should create a new route', async () => {
    const mockRoute = { origin: 'A', destinations: ['B', 'C'] };
    (LogisticsService.createRoute as jest.Mock).mockResolvedValue(mockRoute);
    
    const res = await request(app)
      .post('/api/logistics')
      .send(mockRoute);
      
    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockRoute);
  });
  
  it('should get a route by ID', async () => {
    const mockRoute = { id: '1', origin: 'A', destinations: ['B', 'C'] };
    (LogisticsService.getRouteById as jest.Mock).mockResolvedValue(mockRoute);
    
    const res = await request(app)
      .get('/api/logistics/1');
      
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockRoute);
  });
  
  it('should update a route by ID', async () => {
    const updatedRoute = { id: '1', origin: 'A', destinations: ['B', 'D'] };
    (LogisticsService.updateRouteById as jest.Mock).mockResolvedValue(updatedRoute);

    const res = await request(app)
      .put('/api/logistics/1')
      .send(updatedRoute);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedRoute);
  });

  it('should delete a route by ID', async () => {
    (LogisticsService.deleteRouteById as jest.Mock).mockResolvedValue(true);

    const res = await request(app)
      .delete('/api/logistics/1');

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it('should get an optimal route', async () => {
    const optimalRoute = ['B', 'C'];
    (LogisticsService.calculateOptimalRoute as jest.Mock).mockResolvedValue(optimalRoute);

    const res = await request(app)
      .post('/api/logistics/optimize')
      .send({ origin: 'A', destinations: ['B', 'C'] });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ optimizedRoute: optimalRoute });
  });

  it('should get coordinates for an address', async () => {
    const coordinates = { latitude: 123.456, longitude: 789.012 };
    (LogisticsService.getCoordinates as jest.Mock).mockResolvedValue(coordinates);

    const res = await request(app)
      .get('/api/logistics/coordinates/some-address');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(coordinates);
  });
});
