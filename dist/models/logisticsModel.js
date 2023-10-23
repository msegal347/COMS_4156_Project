"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the logistics schema with the required fields
const LogisticsSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
// Create the Logistics model from the schema
const LogisticsModel = mongoose_1.default.model('Logistics', LogisticsSchema);
// Export the Logistics model
exports.default = LogisticsModel;
//# sourceMappingURL=logisticsModel.js.map