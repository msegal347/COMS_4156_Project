import * as AllocationService from '../../src/services/allocationService';
import { Allocation } from '../../src/models/allocationModel';
import * as ResourceAllocation from '../../src/algorithms/resourceAllocation';

// Mocking the Allocation model methods
jest.mock('../../src/models/allocationModel', () => ({
  Allocation: {
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

// Mocking the ResourceAllocation methods
jest.mock('../../src/algorithms/resourceAllocation', () => ({
  allocateResources: jest.fn(),
}));

describe('Allocation Service Test', () => {
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
});
