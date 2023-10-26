import mongoose from 'mongoose';

// Define the analytics schema with the required fields
const AnalyticsSchema = new mongoose.Schema(
  {
    data: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Analytics model from the schema and export it
const AnalyticsModel = mongoose.model('Analytics', AnalyticsSchema);

export default AnalyticsModel;
