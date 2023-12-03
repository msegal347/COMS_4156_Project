import ResourceCategory, { IResourceCategory } from '../models/resourceModel';

export const resourceService = {
  async createResource(data: { category: string, quantity: number }): Promise<IResourceCategory> {
    const existingCategory = await ResourceCategory.findOne({ category: data.category });
    if (existingCategory) {
      existingCategory.quantity += data.quantity;
      return await existingCategory.save();
    } else {
      const newCategory = new ResourceCategory(data);
      return await newCategory.save();
    }
  },

  async getResources(): Promise<IResourceCategory[]> {
    return await ResourceCategory.find({});
  },

  async getResourceById(id: string): Promise<IResourceCategory | null> {
    return await ResourceCategory.findById(id);
  },

  async updateResource(id: string, updates: any): Promise<IResourceCategory | null> {
    return await ResourceCategory.findByIdAndUpdate(id, updates, { new: true });
  },

  async deleteResource(id: string): Promise<IResourceCategory | null> {
    return await ResourceCategory.findByIdAndDelete(id);
  },
};
