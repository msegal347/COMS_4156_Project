// test/models/allocationModel.test.ts
import mongoose from 'mongoose';

const mockAllocationSchema = {
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../src/models/allocationModel', () => {
  return {
    Allocation: {
      find: mockAllocationSchema.find,
      save: mockAllocationSchema.save,
      delete: mockAllocationSchema.delete,
    },
  };
});

describe('Allocation Model Test', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('create & save allocation successfully', async () => {
    const inputData = { name: 'Test', resource: 'CPU', amount: 5 };
    mockAllocationSchema.save.mockReturnValue(inputData);

    const savedAllocation = await mockAllocationSchema.save(inputData);
    expect(savedAllocation).toBe(inputData);
  });

  it('find allocation', async () => {
    const findData = [
      { name: 'Test1', resource: 'CPU', amount: 5 },
      { name: 'Test2', resource: 'Memory', amount: 2 },
    ];
    mockAllocationSchema.find.mockReturnValue(findData);

    const foundAllocations = await mockAllocationSchema.find();
    expect(foundAllocations).toBe(findData);
  });

  it('delete allocation', async () => {
    mockAllocationSchema.delete.mockReturnValue('deleted');
    const deletedAllocation = await mockAllocationSchema.delete();
    expect(deletedAllocation).toBe('deleted');
  });
});
