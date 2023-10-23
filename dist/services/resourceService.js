"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceService = void 0;
const resourceModel_1 = __importDefault(require("../models/resourceModel"));
exports.resourceService = {
    // Create a new resource
    createResource(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = new resourceModel_1.default(data);
            return yield resource.save();
        });
    },
    // Retrieve all resources
    getResources() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resourceModel_1.default.find({});
        });
    },
    // Retrieve a single resource by ID
    getResourceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resourceModel_1.default.findById(id);
        });
    },
    // Update a resource
    updateResource(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resourceModel_1.default.findByIdAndUpdate(id, updates, { new: true });
        });
    },
    // Delete a resource
    deleteResource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield resourceModel_1.default.findByIdAndDelete(id);
        });
    },
};
//# sourceMappingURL=resourceService.js.map