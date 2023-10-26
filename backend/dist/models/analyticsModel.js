"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the analytics schema with the required fields
const AnalyticsSchema = new mongoose_1.default.Schema({
    data: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
});
// Create the Analytics model from the schema and export it
const AnalyticsModel = mongoose_1.default.model('Analytics', AnalyticsSchema);
exports.default = AnalyticsModel;
//# sourceMappingURL=analyticsModel.js.map