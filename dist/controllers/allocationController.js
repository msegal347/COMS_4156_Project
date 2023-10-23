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
exports.deleteAllocationById = exports.updateAllocationById = exports.getAllocationById = exports.createAllocation = void 0;
const AllocationService = __importStar(require("../services/allocationService"));
// Utility function to check if an object is empty
const isEmptyObject = (obj) => {
    return !obj || Object.keys(obj).length === 0;
};
// create the allocation
const createAllocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, resource, amount } = req.body;
        if (isEmptyObject(req.body) || !name || !resource || amount === undefined) {
            res.status(400).json({ error: 'Bad Request: Missing required fields' });
            return;
        }
        const newAllocation = yield AllocationService.createAllocation(req.body);
        res.status(201).json(newAllocation);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createAllocation = createAllocation;
//get the allocation by id
const getAllocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Bad Request: Missing ID parameter' });
            return;
        }
        const allocation = yield AllocationService.getAllocationById(id);
        if (!allocation) {
            res.status(404).json({ error: 'Not Found: Allocation does not exist' });
            return;
        }
        res.status(200).json(allocation);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllocationById = getAllocationById;
// update the allocation by id
const updateAllocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Bad Request: Missing ID parameter' });
            return;
        }
        if (isEmptyObject(req.body)) {
            res.status(400).json({ error: 'Bad Request: Missing request body' });
            return;
        }
        const updatedAllocation = yield AllocationService.updateAllocationById(id, req.body);
        if (!updatedAllocation) {
            res.status(404).json({ error: 'Not Found: Allocation does not exist' });
            return;
        }
        res.status(200).json(updatedAllocation);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateAllocationById = updateAllocationById;
// delete the allocation by id
const deleteAllocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Bad Request: Missing ID parameter' });
            return;
        }
        const deleted = yield AllocationService.deleteAllocationById(id);
        if (!deleted) {
            res.status(404).json({ error: 'Not Found: Allocation does not exist' });
            return;
        }
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteAllocationById = deleteAllocationById;
//# sourceMappingURL=allocationController.js.map