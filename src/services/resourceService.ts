import ResourceCategory, { IResourceCategory } from '../models/resourceModel';

export const resourceService = {
  async createResource(data) {
    const existingCategory = await ResourceCategory.findOne({ category: data.category });
    if (existingCategory) {
      // Update existing category's items
      data.items.forEach(item => {
        const existingItem = existingCategory.items.find(i => i.name === item.name);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          existingCategory.items.push(item);
        }
      });
      return await existingCategory.save();
    } else {
      // Create a new category with items
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
