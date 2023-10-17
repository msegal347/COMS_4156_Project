import { allocateResources, Source, Sink } from '../algorithms/resourceAllocation';
import { Allocation } from '../models/allocationModel';

export const createAllocation = async (data: any) => {
  return await Allocation.create(data);
};

export const getAllocationById = async (id: string) => {
  return await Allocation.findById(id);
};

export const updateAllocationById = async (id: string, data: any) => {
  return await Allocation.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAllocationById = async (id: string) => {
  return await Allocation.findByIdAndDelete(id);
};

export const findOptimalAllocation = async (criteria: any) => {
  const sources: Source[] = criteria.sources;
  const sinks: Sink[] = criteria.sinks;

  const matches = allocateResources(sources, sinks);

  return {
    matches,
  };
};
