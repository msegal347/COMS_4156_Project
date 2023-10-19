import * as AnalyticsService from '../../src/services/analyticsService';
import { 
  createRecord, 
  getRecordById, 
  updateRecordById, 
  deleteRecordById, 
} from '../../src/controllers/analyticsController';

import { mockRequest, mockResponse, mockNext } from '../../src/utils/expressMock';

import "@jazzer.js/jest-runner/jest-extension";

jest.mock('../../../src/services/analyticsService');

describe('AnalyticsController', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    req.params = {}; 
  });

  it.fuzz('should create a new record', async () => {
    const newRecord = { data: 'data' };
    (AnalyticsService.createRecord as jest.Mock).mockResolvedValue(newRecord);

    await createRecord(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newRecord);
  });

  it.fuzz('should get a record by ID', async () => {
    const record = { id: '1', data: 'data' };
    (AnalyticsService.getRecordById as jest.Mock).mockResolvedValue(record);
  
    // Initialize params if it is undefined
    req.params = req.params || {};
    req.params.id = '1'; // Now this should work without any issue
  
    await getRecordById(req, res, next);
  
    // Debugging lines
    if (!res.status.mock.calls.length) console.log('res.status was never called');
    if (next.mock.calls.length) console.log('next was called with:', next.mock.calls[0][0]);
  
    expect(AnalyticsService.getRecordById).toHaveBeenCalled();  // New line to check if service method was called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(record);
  });
  
  

  it.fuzz('should update a record by ID', async () => {
    const updatedRecord = { id: '1', data: 'updated' };
    req.params.id = '1';  // Set the ID
    (AnalyticsService.updateRecordById as jest.Mock).mockResolvedValue(updatedRecord);
    
    await updateRecordById(req, res, next);

    if (!res.status.mock.calls.length) {
      console.log('res.status was never called');
    }
    if (next.mock.calls.length) {
      console.log('next was called with:', next.mock.calls[0][0]);
    }

    expect(AnalyticsService.updateRecordById).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedRecord);
  });

  it.fuzz('should delete a record by ID', async () => {
    req.params.id = '1';  // Set the ID
    (AnalyticsService.deleteRecordById as jest.Mock).mockResolvedValue(true);
    
    await deleteRecordById(req, res, next);

    if (!res.status.mock.calls.length) {
      console.log('res.status was never called');
    }
    if (next.mock.calls.length) {
      console.log('next was called with:', next.mock.calls[0][0]);
    }

    expect(AnalyticsService.deleteRecordById).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({});
  });
});
