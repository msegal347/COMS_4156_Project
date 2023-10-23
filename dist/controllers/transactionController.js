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
exports.transactionController = void 0;
const transactionService_1 = require("../services/transactionService");
exports.transactionController = {
    // Create a new transaction
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield transactionService_1.transactionService.createTransaction(req.body);
                res.status(201).json(transaction);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    // Retrieve a specific transaction by its ID
    getTransactionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const transaction = yield transactionService_1.transactionService.getTransactionById(id);
                if (!transaction) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                res.status(200).json(transaction);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    // Retrieve all transactions for a specific user
    getTransactionsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const transactions = yield transactionService_1.transactionService.getTransactionsByUserId(userId);
                res.status(200).json(transactions);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    // Update a specific transaction by its ID
    updateTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updates = req.body;
                const transaction = yield transactionService_1.transactionService.updateTransaction(id, updates);
                if (!transaction) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                res.status(200).json(transaction);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
    // Delete a specific transaction by its ID
    deleteTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const success = yield transactionService_1.transactionService.deleteTransaction(id);
                if (!success) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
                res.status(204).send();
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
};
//# sourceMappingURL=transactionController.js.map