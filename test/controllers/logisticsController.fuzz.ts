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

import "@jazzer.js/jest-runner/jest-extension";

jest.mock('../../../src/services/logisticsService');

describe('LogisticsController', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    req.params = {}; 
  });

  it.fuzz('should create a new route', async () => {
    const newRoute = { origin: 'A', destinations: ['B', 'C'] };
    (LogisticsService.createRoute as jest.Mock).mockResolvedValue(newRoute);

    await createRoute(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newRoute);
  });

  it.fuzz('should get a route by ID', async () => {
    const route = { id: '1', origin: 'A', destinations: ['B', 'C'] };
    (LogisticsService.getRouteById as jest.Mock).mockResolvedValue(route);
  
    // Initialize params if it is undefined
    req.params = req.params || {};
    req.params.id = '1';
  
    await getRouteById(req, res, next);
  
    if (!res.status.mock.calls.length) console.log('res.status was never called');
    if (next.mock.calls.length) console.log('next was called with:', next.mock.calls[0][0]);
  
    expect(LogisticsService.getRouteById).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(route);
  });
  
  

  it.fuzz('should update a route by ID', async () => {
    const updatedRoute = { id: '1', origin: 'A', destinations: ['B', 'D'] };
    req.params.id = '1'; 
    (LogisticsService.updateRouteById as jest.Mock).mockResolvedValue(updatedRoute);
    
    await updateRouteById(req, res, next);

    if (!res.status.mock.calls.length) {
      console.log('res.status was never called');
    }
    if (next.mock.calls.length) {
      console.log('next was called with:', next.mock.calls[0][0]);
    }

    expect(LogisticsService.updateRouteById).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedRoute);
  });

  it.fuzz('should delete a route by ID', async () => {
    req.params.id = '1'; 
    (LogisticsService.deleteRouteById as jest.Mock).mockResolvedValue(true);
    
    await deleteRouteById(req, res, next);

    if (!res.status.mock.calls.length) {
      console.log('res.status was never called');
    }
    if (next.mock.calls.length) {
      console.log('next was called with:', next.mock.calls[0][0]);
    }

    expect(LogisticsService.deleteRouteById).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({});
  });
  

  it.fuzz('should get an optimal route', async () => {
    const optimalRoute = ['B', 'C'];
    
    // Setup mock to resolve with optimalRoute
    (LogisticsService.calculateOptimalRoute as jest.Mock).mockResolvedValue(optimalRoute);
    
    // Initialize req.body if it is undefined
    req.body = req.body || {};
    req.body.origin = 'Some Origin';
    req.body.destinations = ['Some', 'Destinations'];
    
    await getOptimalRoute(req, res, next);

    // Debugging lines
    if (!res.status.mock.calls.length) console.log('res.status was never called');
    if (next.mock.calls.length) console.log('next was called with:', next.mock.calls[0][0]);
    if (!(LogisticsService.calculateOptimalRoute as jest.Mock).mock.calls.length) {
      console.log('LogisticsService.calculateOptimalRoute was never called');
    }

    // Assertions
    expect(LogisticsService.calculateOptimalRoute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ optimizedRoute: optimalRoute });
  });


  it.fuzz('should get coordinates for an address', async () => {
    const coordinates = { latitude: 123.456, longitude: 789.012 };
    (LogisticsService.getCoordinates as jest.Mock).mockResolvedValue(coordinates);

    await getCoordinates(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(coordinates);
  });
});
