import Request, { IRequest } from '../models/requestModel';
import ResourceCategory from '../models/resourceModel'; 
import mongoose from 'mongoose';

export const requestService = {
  async createRequest(requestData: any): Promise<IRequest> {
    // Validate each materialId against ResourceCategory
    for (const material of requestData.materials) {
      const resourceCategory = await ResourceCategory.findById(material.materialId);
      if (!resourceCategory) {
        throw new Error(`Resource category with ID ${material.materialId} not found`);
      }
      
      // Calculate total available quantity
      const totalAvailableQuantity = resourceCategory.userResources.reduce((sum, userRes) => sum + userRes.quantity, 0);
      if (totalAvailableQuantity < material.quantity) {
        throw new Error(`Not enough quantity available for resource category ID ${material.materialId}`);
      }
    }

    const newRequest = new Request({
      userId: new mongoose.Types.ObjectId(requestData.userId),
      materials: requestData.materials.map(material => ({
        materialId: material.materialId,
        quantity: material.quantity,
        fulfilled: false,
        remainingQuantity: material.quantity
      })),
    });
    await newRequest.save();
    return newRequest;
  },
};

export default requestService;
