import { allocateResources, Source, Sink } from '../algorithms/resourceAllocation';
import { Allocation } from '../models/allocationModel';

// Creates a new allocation
export const createAllocation = async (data: any) => {
  return await Allocation.create(data);
};

// Gets the allocation with the given ID
export const getAllocationById = async (id: string) => {
  return await Allocation.findById(id);
};

// Updates the allocation with the given ID
export const updateAllocationById = async (id: string, data: any) => {
  return await Allocation.findByIdAndUpdate(id, data, { new: true });
};

// Deletes the allocation with the given ID
export const deleteAllocationById = async (id: string) => {
  return await Allocation.findByIdAndDelete(id);
};

// Find the optimal allocation based on the given criteria using the resource allocation algorithm
export const findOptimalAllocation = async (criteria: any) => {
  const sources: Source[] = criteria.sources;
  const sinks: Sink[] = criteria.sinks;

  const matches = allocateResources(sources, sinks);

  return {
    matches,
  };
};
