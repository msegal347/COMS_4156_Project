import { allocateResources, Source, Sink } from '../algorithms/resourceAllocation';
import { Allocation } from '../models/allocationModel';
import ResourceModel from '../models/resourceModel'; 
import RequestModel, { IRequest } from '../models/requestModel';

async function fetchSourcesAndSinks() {
  const resources = await ResourceModel.find({});
  const requests = await RequestModel.find({}).populate('materials.materialId');

  const sources: Source[] = resources.map(resource => ({
    id: resource._id.toString(),
    resourceType: resource.category,
    quantity: resource.quantity
  }));

  let sinks: Sink[] = [];
  requests.forEach(request => {
    request.materials.forEach(async (material) => {
      const resource = await ResourceModel.findById(material.materialId); // Resolve resourceType from materialId
      if (resource) {
        sinks.push({
          id: request._id.toString(),
          resourceType: resource.category,
          requiredQuantity: material.quantity
        });
      }
    });
  });

  return { sources, sinks };
}

export const triggerAllocationProcess = async () => {
  const { sources, sinks } = await fetchSourcesAndSinks();
  const matches = allocateResources(sources, sinks);

  for (const match of matches) {
    const { sourceId, sinkId, allocatedQuantity } = match;

    await ResourceModel.findByIdAndUpdate(sourceId, { $inc: { quantity: -allocatedQuantity } });

    const request = await RequestModel.findById(sinkId) as IRequest;
    if (request && request.materials) {
      const materialToUpdate = request.materials.find(material => material.materialId.toString() === sourceId);
      if (materialToUpdate) {
        materialToUpdate.fulfilled = true;
        materialToUpdate.remainingQuantity -= allocatedQuantity;
        await request.save();
      }
    }

    await Allocation.create({ sourceId, sinkId, allocatedQuantity });
  }

  return matches;
};

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
