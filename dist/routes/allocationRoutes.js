"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/allocationRoutes.ts
const express_1 = require("express");
const allocationController_1 = require("../controllers/allocationController");
const router = (0, express_1.Router)();
// Create a new allocation
router.post('/', allocationController_1.createAllocation);
// Get an allocation by ID
router.get('/:id', allocationController_1.getAllocationById);
// Update an allocation by ID
router.put('/:id', allocationController_1.updateAllocationById);
// Delete an allocation by ID
router.delete('/:id', allocationController_1.deleteAllocationById);
exports.default = router;
//# sourceMappingURL=allocationRoutes.js.map