"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalyticsRoutes = void 0;
const express_1 = require("express");
const createAnalyticsRoutes = ({ createRecord, getRecordById, updateRecordById, deleteRecordById, }) => {
    const router = (0, express_1.Router)();
    // Create a new analytics record
    router.post('/', createRecord);
    // Get a analytics record by ID
    router.get('/:id', getRecordById);
    // Update a analytics record by ID
    router.put('/:id', updateRecordById);
    // Delete a analytics record by ID
    router.delete('/:id', deleteRecordById);
    return router;
};
exports.createAnalyticsRoutes = createAnalyticsRoutes;
//# sourceMappingURL=analyticsRoutes.js.map