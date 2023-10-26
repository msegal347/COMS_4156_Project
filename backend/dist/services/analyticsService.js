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
exports.deleteRecordById = exports.updateRecordById = exports.getRecordById = exports.createRecord = void 0;
const analyticsModel_1 = __importDefault(require("../models/analyticsModel"));
// Create a new analytics record
const createRecord = (recordData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRecord = new analyticsModel_1.default(recordData);
        yield newRecord.save();
        return newRecord;
    }
    catch (err) {
        throw new Error(`Error in creating new record: ${err}`);
    }
});
exports.createRecord = createRecord;
// Get an analytics record by ID
const getRecordById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield analyticsModel_1.default.findById(id);
        if (!record) {
            throw new Error('Record not found');
        }
        return record;
    }
    catch (err) {
        throw new Error(`Error in getting record by ID: ${err}`);
    }
});
exports.getRecordById = getRecordById;
// Update an analytics record by ID
const updateRecordById = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRecord = yield analyticsModel_1.default.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedRecord) {
            throw new Error('Record not found');
        }
        return updatedRecord;
    }
    catch (err) {
        throw new Error(`Error in updating record by ID: ${err}`);
    }
});
exports.updateRecordById = updateRecordById;
// Delete an analytics record by ID
const deleteRecordById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield analyticsModel_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Record not found');
        }
    }
    catch (err) {
        throw new Error(`Error in deleting record by ID: ${err}`);
    }
});
exports.deleteRecordById = deleteRecordById;
//# sourceMappingURL=analyticsService.js.map