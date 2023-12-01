import * as AllocationService from '../../src/services/allocationService';
import { Allocation } from '../../src/models/allocationModel';
import ResourceModel from '../../src/models/resourceModel';
import RequestModel from '../../src/models/requestModel';
import * as ResourceAllocation from '../../src/algorithms/resourceAllocation';

// Mock the Allocation model's static methods
Allocation.create = jest.fn().mockImplementation(async (data) => data);
Allocation.findById = jest.fn().mockImplementation(async (id) => ({ id, location: 'Location A', items: ['item1', 'item2'] }));
Allocation.findByIdAndUpdate = jest.fn().mockImplementation(async (id, updateData) => updateData);
Allocation.findByIdAndDelete = jest.fn().mockImplementation(async (id) => true);
Allocation.find = jest.fn().mockImplementation(async () => []);

// Mock ResourceModel and RequestModel similarly
ResourceModel.find = jest.fn().mockImplementation(() => ({ exec: async () => [] }));
ResourceModel.findByIdAndUpdate = jest.fn().mockImplementation(async (id, updateData) => updateData);
RequestModel.find = jest.fn().mockImplementation(() => ({ populate: () => ({ exec: async () => [] }) }));


// Mocking the Allocation model methods
jest.mock('../../src/models/allocationModel', () => ({
  Allocation: {
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    find: jest.fn(),
  },
}));

jest.mock('../../src/models/resourceModel', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

jest.mock('../../src/models/requestModel', () => ({
  find: jest.fn().mockResolvedValue([]),
  findById: jest.fn(),
}));

// Mocking the ResourceAllocation methods
jest.mock('../../src/algorithms/resourceAllocation', () => ({
  allocateResources: jest.fn(),
}));

describe('Allocation Service Test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Should create an allocation
  it('should create an allocation', async () => {
    const mockData = { location: 'Location A', items: ['item1', 'item2'] };
    (Allocation.create as jest.Mock).mockResolvedValue(mockData);

    const result = await AllocationService.createAllocation(mockData);

    expect(result).toEqual(mockData);
  });

  // Should get an allocation by ID
  it('should get an allocation by ID', async () => {
    const mockData = { id: '1', location: 'Location A', items: ['item1', 'item2'] };
    (Allocation.findById as jest.Mock).mockResolvedValue(mockData);

    const result = await AllocationService.getAllocationById('1');

    expect(result).toEqual(mockData);
  });

  // Should update an allocation by ID
  it('should update an allocation by ID', async () => {
    const mockData = { id: '1', location: 'Location B', items: ['item2', 'item3'] };
    (Allocation.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockData);

    const result = await AllocationService.updateAllocationById('1', mockData);

    expect(result).toEqual(mockData);
  });

  // Should delete an allocation by ID
  it('should delete an allocation by ID', async () => {
    (Allocation.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

    const result = await AllocationService.deleteAllocationById('1');

    expect(result).toBeTruthy();
  });

  // Should find optimal allocation
  it('should find optimal allocation', async () => {
    const mockSources = [
      { id: '1', resourceType: 'Food', quantity: 100 },
      { id: '2', resourceType: 'Water', quantity: 50 },
    ];

    const mockSinks = [
      { id: '3', resourceType: 'Food', requiredQuantity: 50 },
      { id: '4', resourceType: 'Water', requiredQuantity: 30 },
    ];

    const mockMatches = [
      { sourceId: '1', sinkId: '3', allocatedQuantity: 50 },
      { sourceId: '2', sinkId: '4', allocatedQuantity: 30 },
    ];

    (ResourceAllocation.allocateResources as jest.Mock).mockReturnValue(mockMatches);

    const result = await AllocationService.findOptimalAllocation({ sources: mockSources, sinks: mockSinks });

    expect(result).toEqual({ matches: mockMatches });
  });

  it('should get all allocations', async () => {
    const mockData = { id: '1', location: 'Location A', items: ['item1', 'item2'] };
    const mockData2 = { id: '2', location: 'Location B', items: ['item3', 'item4'] };
    const mockResult = [mockData, mockData2];
    (Allocation.create as jest.Mock).mockResolvedValue(mockData);
    (Allocation.create as jest.Mock).mockResolvedValue(mockData2);
    Allocation.find = jest.fn().mockResolvedValue(mockResult);

    const result = await AllocationService.getAllAllocations();

    expect(result).toEqual(mockResult);
  });

  // Should not create an allocation with missing fields
  it('should not create an allocation with missing fields', async () => {
    const mockData = { location: 'Location A' }; // Missing 'items'
    (Allocation.create as jest.Mock).mockRejectedValue(new Error('Validation Error'));

    await expect(AllocationService.createAllocation(mockData)).rejects.toThrow('Validation Error');
  });

  // Should handle null or undefined ID for getAllocationById
  it('should handle null or undefined ID for getAllocationById', async () => {
    (Allocation.findById as jest.Mock).mockResolvedValue(null);

    const result = await AllocationService.getAllocationById(undefined as any);
    expect(result).toBeNull();
  });

  // Should not update an allocation with missing fields
  it('should not update an allocation with invalid ID', async () => {
    const mockData = { id: 'invalid_id', location: 'Location B', items: ['item2', 'item3'] };
    (Allocation.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const result = await AllocationService.updateAllocationById('invalid_id', mockData);
    expect(result).toBeNull();
  });

  // Should not delete an allocation with invalid ID
  it('should not delete an allocation with invalid ID', async () => {
    (Allocation.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const result = await AllocationService.deleteAllocationById('invalid_id');
    expect(result).toBeNull();
  });

  // Should handle invalid sources and sinks for optimal allocation
  it('should handle invalid sources and sinks for optimal allocation', async () => {
    const invalidSources = null;
    const invalidSinks = null;

    (ResourceAllocation.allocateResources as jest.Mock).mockReturnValue(null);

    const result = await AllocationService.findOptimalAllocation({ sources: invalidSources, sinks: invalidSinks });
    expect(result).toEqual({ matches: null });
  });

  it('should handle empty sources and sinks in triggerAllocationProcess', async () => {
    const result = await AllocationService.triggerAllocationProcess();
    
    expect(result).toEqual([]);
    expect(ResourceModel.find().exec).toHaveBeenCalled();
    expect(RequestModel.find().populate).toHaveBeenCalledWith('materials.materialId');
    expect(ResourceAllocation.allocateResources).toHaveBeenCalledWith([], []);
  });

  // Test the triggerAllocationProcess with database operation failure
  it('should handle database operation failures in triggerAllocationProcess', async () => {
    const mockSources = [{ id: 'source1', resourceType: 'Food', quantity: 100 }];
    const mockSinks = [{ id: 'sink1', resourceType: 'Food', requiredQuantity: 50 }];
    const mockMatches = [{ sourceId: 'source1', sinkId: 'sink1', allocatedQuantity: 50 }];

    jest.spyOn(ResourceModel, 'find').mockResolvedValue(mockSources);
    jest.spyOn(RequestModel, 'find').mockResolvedValue(mockSinks);
    jest.spyOn(ResourceAllocation, 'allocateResources').mockReturnValue(mockMatches);
    jest.spyOn(ResourceModel, 'findByIdAndUpdate').mockRejectedValue(new Error('Database update failed'));

    await expect(AllocationService.triggerAllocationProcess()).rejects.toThrow('Database update failed');
  });

  it('should handle database errors in triggerAllocationProcess', async () => {
    jest.spyOn(ResourceModel, 'find').mockRejectedValue(new Error('Database error'));
    await expect(AllocationService.triggerAllocationProcess()).rejects.toThrow('Database error');
  });

  it('should handle no matches in triggerAllocationProcess', async () => {
    jest.spyOn(ResourceModel, 'find').mockResolvedValue([]); // No sources
    jest.spyOn(RequestModel, 'find').mockResolvedValue([]); // No sinks
    jest.spyOn(ResourceAllocation, 'allocateResources').mockReturnValue([]);
    const result = await AllocationService.triggerAllocationProcess();
    expect(result).toEqual([]);
  });

  it('should handle failed updates in triggerAllocationProcess', async () => {
    // Mock data for sources, sinks and matches
    const mockMatches = [/* Mock matches data */];
    jest.spyOn(ResourceModel, 'find').mockResolvedValue([/* Mock sources data */]);
    jest.spyOn(RequestModel, 'find').mockResolvedValue([/* Mock sinks data */]);
    jest.spyOn(ResourceAllocation, 'allocateResources').mockReturnValue(mockMatches);
    jest.spyOn(ResourceModel, 'findByIdAndUpdate').mockRejectedValue(new Error('Failed to update resource'));

    await expect(AllocationService.triggerAllocationProcess()).rejects.toThrow('Failed to update resource');
  });

  it('should handle invalid sources and sinks in findOptimalAllocation', async () => {
    const result = await AllocationService.findOptimalAllocation({ sources: null, sinks: null });
    expect(result).toEqual({ matches: [] });
  });
});

