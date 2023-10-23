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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOptimalAllocation = exports.deleteAllocationById = exports.updateAllocationById = exports.getAllocationById = exports.createAllocation = void 0;
const resourceAllocation_1 = require("../algorithms/resourceAllocation");
const allocationModel_1 = require("../models/allocationModel");
// Creates a new allocation
const createAllocation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield allocationModel_1.Allocation.create(data);
});
exports.createAllocation = createAllocation;
// Gets the allocation with the given ID
const getAllocationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield allocationModel_1.Allocation.findById(id);
});
exports.getAllocationById = getAllocationById;
// Updates the allocation with the given ID
const updateAllocationById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield allocationModel_1.Allocation.findByIdAndUpdate(id, data, { new: true });
});
exports.updateAllocationById = updateAllocationById;
// Deletes the allocation with the given ID
const deleteAllocationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield allocationModel_1.Allocation.findByIdAndDelete(id);
});
exports.deleteAllocationById = deleteAllocationById;
// Find the optimal allocation based on the given criteria using the resource allocation algorithm
const findOptimalAllocation = (criteria) => __awaiter(void 0, void 0, void 0, function* () {
    const sources = criteria.sources;
    const sinks = criteria.sinks;
    const matches = (0, resourceAllocation_1.allocateResources)(sources, sinks);
    return {
        matches,
    };
});
exports.findOptimalAllocation = findOptimalAllocation;
//# sourceMappingURL=allocationService.js.map