"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the nested object schema
const NestedObjectSchema = new mongoose_1.Schema({
    field1: { type: String, required: true },
    field2: { type: Number, required: true },
});
// Define the entity schema with the required fields
const entitySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    attribute: { type: String, required: true },
    type: {
        type: String,
        enum: ['Type1', 'Type2', 'Type3'],
        required: true,
    },
    isActive: { type: Boolean, default: true },
    nestedObject: { type: NestedObjectSchema, required: true },
}, {
    timestamps: true,
});
// Create the Entity model from the schema and export it
exports.Entity = mongoose_1.default.model('Entity', entitySchema);
//# sourceMappingURL=entityModel.js.map