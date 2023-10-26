import mongoose from 'mongoose';

// Define the logistics schema with the required fields
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

// Create the Logistics model from the schema
const LogisticsModel = mongoose.model('Logistics', LogisticsSchema);

// Export the Logistics model
export default LogisticsModel;
