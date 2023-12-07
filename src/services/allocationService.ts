import { allocateResources, Source, Sink } from '../algorithms/resourceAllocation';
import { Allocation } from '../models/allocationModel';
import ResourceCategoryModel from '../models/resourceModel';
import RequestModel, { IRequest } from '../models/requestModel';
import UserModel from '../models/userModel'; 
import mongoose from 'mongoose';

// Fetch Sources Function
async function fetchSources(): Promise<Source[]> {
  const resourceCategories = await ResourceCategoryModel.find({}).populate('userResources.userId');

  return resourceCategories.map(category => {
    const totalQuantity = category.userResources.reduce((sum, userResource) => sum + userResource.quantity, 0);
    return {
      id: category._id.toString(),
      resourceType: category.category,
      quantity: totalQuantity,
    };
  });
}

// Fetch Sinks Function
async function fetchSinks(): Promise<Sink[]> {
  const requests = await RequestModel.find({}).populate('materials.materialId');
  const sinks: Sink[] = [];

  for (const request of requests) {
    for (const material of request.materials) {
      const resourceCategory = await ResourceCategoryModel.findById(material.materialId);
      if (resourceCategory) {
        sinks.push({
          id: request._id.toString(),
          resourceType: resourceCategory.category,
          requiredQuantity: material.quantity,
        });
      }
    }
  }

  return sinks;
}

// Trigger Allocation Process Function
export const triggerAllocationProcess = async () => {
  const sources = await fetchSources();
  const sinks = await fetchSinks();
  const matches = allocateResources(sources, sinks);

  for (const match of matches) {
    const { sourceId, sinkId, allocatedQuantity } = match;

    // Update the source resource's quantity
    const sourceCategory = await ResourceCategoryModel.findById(sourceId);
    if (sourceCategory) {
      for (const userResource of sourceCategory.userResources) {
        if (userResource.quantity >= allocatedQuantity) {
          userResource.quantity -= allocatedQuantity;
          break; // Assuming one userResource can fulfill the allocation
        }
      }
      await sourceCategory.save();
    }

    // Update the sink request
    const request = await RequestModel.findById(sinkId) as IRequest;
    if (request) {
      for (const material of request.materials) {
        if (material.materialId.toString() === sourceId) {
          material.fulfilled = true;
          material.remainingQuantity = (material.remainingQuantity || material.quantity) - allocatedQuantity;
          break;
        }
      }
      await request.save();
    }

    // Create an allocation record
    await Allocation.create({ 
      sourceId: new mongoose.Types.ObjectId(sourceId), 
      sinkId: new mongoose.Types.ObjectId(sinkId), 
      allocatedQuantity 
    });
  }

  return matches;
};

// Creates a new allocation
export const createAllocation = async (data: any) => {
  return await Allocation.create(data);
};

// Gets the allocation with the given ID
export const getAllocationById = async (id: string) => {
  return await Allocation.findById(id).populate(['sourceId', 'sinkId']);
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
  return await Allocation.find({}).populate(['sourceId', 'sinkId']);
};
