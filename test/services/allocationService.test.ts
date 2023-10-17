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
  it('should create an allocation', async () => {
    const mockData = { location: 'Location A', items: ['item1', 'item2'] };
    (Allocation.create as jest.Mock).mockResolvedValue(mockData);

    const result = await AllocationService.createAllocation(mockData);

    expect(result).toEqual(mockData);
  });

  it('should get an allocation by ID', async () => {
    const mockData = { id: '1', location: 'Location A', items: ['item1', 'item2'] };
    (Allocation.findById as jest.Mock).mockResolvedValue(mockData);

    const result = await AllocationService.getAllocationById('1');

    expect(result).toEqual(mockData);
  });

  it('should update an allocation by ID', async () => {
    const mockData = { id: '1', location: 'Location B', items: ['item2', 'item3'] };
    (Allocation.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockData);

    const result = await AllocationService.updateAllocationById('1', mockData);

    expect(result).toEqual(mockData);
  });

  it('should delete an allocation by ID', async () => {
    (Allocation.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

    const result = await AllocationService.deleteAllocationById('1');

    expect(result).toBeTruthy();
  });

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
});
