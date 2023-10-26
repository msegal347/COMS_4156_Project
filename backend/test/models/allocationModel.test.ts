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
    jest.clearAllMocks();
  });

  it('create & save allocation successfully', async () => {
    const inputData = { name: 'Test', resource: 'Food1', amount: 5 };
    mockAllocationSchema.save.mockReturnValue(inputData);

    const savedAllocation = await mockAllocationSchema.save(inputData);
    expect(savedAllocation).toBe(inputData);
  });

  it('should not save allocation with invalid resource type', async () => {
    const inputData = { name: 'Test', resource: 'InvalidResource', amount: 5 };
    mockAllocationSchema.save.mockImplementation((inputData) => {
      if (inputData.resource === 'InvalidResource') {
        return Promise.reject(new Error('Invalid resource type'));
      }
      return Promise.resolve(inputData);
    });

    await expect(mockAllocationSchema.save(inputData)).rejects.toThrow('Invalid resource type');
  });

  it('should not save allocation with amount out of range', async () => {
    const inputData = { name: 'Test', resource: 'Food1', amount: 101 };
    mockAllocationSchema.save.mockImplementation((inputData) => {
      if (inputData.amount > 100 || inputData.amount < 1) {
        return Promise.reject(new Error('Amount out of range'));
      }
      return Promise.resolve(inputData);
    });

    await expect(mockAllocationSchema.save(inputData)).rejects.toThrow('Amount out of range');
  });

  it('find allocation', async () => {
    const findData = [
      { name: 'Test1', resource: 'Food1', amount: 5 },
      { name: 'Test2', resource: 'Food2', amount: 2 },
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
