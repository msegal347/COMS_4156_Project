import { allocateResources, Source, Sink } from '../algorithms/resourceAllocation';
import { Allocation } from '../models/allocationModel';
import ResourceCategoryModel from '../models/resourceModel';
import RequestModel, { IRequest } from '../models/requestModel';

async function fetchSourcesAndSinks() {
  const resourceCategories = await ResourceCategoryModel.find({});
  const requests = await RequestModel.find({}).populate('materials.materialId');

  const sources: Source[] = resourceCategories.map(category => ({
    id: category._id.toString(),
    resourceType: category.category,
    quantity: category.quantity,
  }));

  const sinks: Sink[] = [];
  requests.forEach(request => {
    request.materials.forEach(async material => {
      const resourceCategory = await ResourceCategoryModel.findById(material.materialId);
      if (resourceCategory) {
        sinks.push({
          id: request._id.toString(),
          resourceType: resourceCategory.category,
          requiredQuantity: material.quantity,
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

    // Update the quantity of the resource category
    await ResourceCategoryModel.findByIdAndUpdate(sourceId, { $inc: { quantity: -allocatedQuantity } });

    const request = (await RequestModel.findById(sinkId)) as IRequest;
    if (request && request.materials) {
      const materialToUpdate = request.materials.find(
        material => material.materialId.toString() === sourceId
      );
      if (materialToUpdate) {
        materialToUpdate.fulfilled = true;

        // Initialize remainingQuantity if undefined
        if (materialToUpdate.remainingQuantity === undefined) {
          materialToUpdate.remainingQuantity = materialToUpdate.quantity;
        }

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

export const getAllAllocations = async () => {
  return await Allocation.find({});
};
