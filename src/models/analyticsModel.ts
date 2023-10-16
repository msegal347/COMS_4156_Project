import mongoose from 'mongoose';

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

const AnalyticsModel = mongoose.model('Analytics', AnalyticsSchema);

export default AnalyticsModel;
