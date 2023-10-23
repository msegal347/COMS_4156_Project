"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
// Create a new transaction
router.post('/', transactionController_1.transactionController.createTransaction);
// Retrieve a specific transaction by its ID
router.get('/:id', transactionController_1.transactionController.getTransactionById);
// Retrieve all transactions for a specific user
router.get('/user/:userId', transactionController_1.transactionController.getTransactionsByUserId);
// Update a transaction
router.put('/:id', transactionController_1.transactionController.updateTransaction);
// Delete a transaction
router.delete('/:id', transactionController_1.transactionController.deleteTransaction);
exports.default = router;
//# sourceMappingURL=transactionRoutes.js.map