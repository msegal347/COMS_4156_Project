"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
// Create a new notification
router.post('/', notificationController_1.notificationController.createNotification);
// Retrieve all notifications for a user
router.get('/:userId', notificationController_1.notificationController.getNotifications);
// Update a notification by its ID
router.put('/:id', notificationController_1.notificationController.updateNotification);
// Delete a notification by its ID
router.delete('/:id', notificationController_1.notificationController.deleteNotification);
exports.default = router;
//# sourceMappingURL=notificationRoutes.js.map