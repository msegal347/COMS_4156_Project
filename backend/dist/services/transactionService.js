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
exports.transactionService = void 0;
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
exports.transactionService = {
    // Create a new transaction
    createTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = new transactionModel_1.default(data);
            return yield transaction.save();
        });
    },
    // Retrieve a specific transaction by its ID
    getTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield transactionModel_1.default.findById(id);
        });
    },
    // Retrieve all transactions for a specific user
    getTransactionsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield transactionModel_1.default.find({ userId });
        });
    },
    // Update a specific transaction
    updateTransaction(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield transactionModel_1.default.findByIdAndUpdate(id, updates, { new: true });
        });
    },
    // Delete a transaction
    deleteTransaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield transactionModel_1.default.findByIdAndDelete(id);
            return result !== null;
        });
    },
};
//# sourceMappingURL=transactionService.js.map