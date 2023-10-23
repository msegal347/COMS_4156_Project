"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allocation = void 0;
// src/models/allocationModel.ts
const mongoose_1 = __importDefault(require("mongoose"));
// Define the allocation schema with the required fields
const allocationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    resource: { type: String, required: true },
    amount: { type: Number, required: true },
});
// Create the Allocation model from the schema and export it
exports.Allocation = mongoose_1.default.model('Allocation', allocationSchema);
//# sourceMappingURL=allocationModel.js.map