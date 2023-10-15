import mongoose from 'mongoose';

const LogisticsSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    destinations: {
      type: [String],
      required: true,
    },
    optimalRoute: {
      type: [String],
    },
    status: {
      type: String,
      enum: ['scheduled', 'in_transit', 'completed', 'cancelled'],
      default: 'scheduled',
    },
  },
  {
    timestamps: true,
  }
);

const LogisticsModel = mongoose.model('Logistics', LogisticsSchema);

export default LogisticsModel;
