import Request, { IRequest } from '../models/requestModel';
import ResourceCategory from '../models/resourceModel'; // Assuming this is your resource category model

export const requestService = {
  async createRequest(requestData: any): Promise<IRequest> {
    // Iterate through each requested material to validate against available resources
    for (const material of requestData.materials) {
      const resourceCategory = await ResourceCategory.findById(material.materialId).populate('userResources.userId');
      if (!resourceCategory) {
        throw new Error(`Resource category with ID ${material.materialId} not found`);
      }
      
      // Calculate total available quantity
      const totalAvailableQuantity = resourceCategory.userResources.reduce((sum, userRes) => sum + userRes.quantity, 0);
      if (totalAvailableQuantity < material.quantity) {
        throw new Error(`Not enough quantity available for resource category ID ${material.materialId}`);
      }
    }

    // Create and save the new request
    const newRequest = new Request(requestData);
    await newRequest.save();
    return newRequest;
  },
};

export default requestService;
