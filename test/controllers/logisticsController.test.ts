import * as LogisticsService from '../../src/services/logisticsService';
import { 
  createRoute, 
  getRouteById, 
  updateRouteById, 
  deleteRouteById, 
  getOptimalRoute, 
  getCoordinates 
} from '../../src/controllers/logisticsController';

import { mockRequest, mockResponse, mockNext } from '../../src/utils/expressMock';

jest.mock('../../src/services/logisticsService');

describe('LogisticsController', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  it('should create a new route', async () => {
    const newRoute = { origin: 'A', destinations: ['B', 'C'] };
    (LogisticsService.createRoute as jest.Mock).mockResolvedValue(newRoute);

    await createRoute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newRoute);
  });

  it('should get a route by ID', async () => {
    const route = { id: '1', origin: 'A', destinations: ['B', 'C'] };
    (LogisticsService.getRouteById as jest.Mock).mockResolvedValue(route);

    await getRouteById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(route);
  });

  it('should update a route by ID', async () => {
    const updatedRoute = { id: '1', origin: 'A', destinations: ['B', 'D'] };
    (LogisticsService.updateRouteById as jest.Mock).mockResolvedValue(updatedRoute);

    await updateRouteById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedRoute);
  });

  it('should delete a route by ID', async () => {
    (LogisticsService.deleteRouteById as jest.Mock).mockResolvedValue(true);

    await deleteRouteById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it('should get an optimal route', async () => {
    const optimalRoute = ['B', 'C'];
    (LogisticsService.calculateOptimalRoute as jest.Mock).mockResolvedValue(optimalRoute);

    await getOptimalRoute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ optimizedRoute: optimalRoute });
  });

  it('should get coordinates for an address', async () => {
    const coordinates = { latitude: 123.456, longitude: 789.012 };
    (LogisticsService.getCoordinates as jest.Mock).mockResolvedValue(coordinates);

    await getCoordinates(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(coordinates);
  });
});
