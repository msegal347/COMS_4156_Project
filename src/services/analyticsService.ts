import AnalyticsModel from '../models/analyticsModel';

// Create a new analytics record
export const createRecord = async (recordData: any): Promise<any> => {
  try {
    const newRecord = new AnalyticsModel(recordData);
    await newRecord.save();
    return newRecord;
  } catch (err) {
    throw new Error(`Error in creating new record: ${err}`);
  }
};

// Get an analytics record by ID
export const getRecordById = async (id: string): Promise<any> => {
  try {
    const record = await AnalyticsModel.findById(id);
    return record;
  } catch (err) {
    throw new Error(`Error in getting record by ID: ${err}`);
  }
};

// Update an analytics record by ID
export const updateRecordById = async (id: string, updatedData: any): Promise<any> => {
  try {
    const updatedRecord = await AnalyticsModel.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedRecord;
  } catch (err) {
    throw new Error(`Error in updating record by ID: ${err}`);
  }
};

// Delete an analytics record by ID
export const deleteRecordById = async (id: string): Promise<void> => {
  try {
    const result = await AnalyticsModel.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(`Error in deleting record by ID: ${err}`);
  }
};
