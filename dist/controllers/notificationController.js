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
exports.notificationController = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
exports.notificationController = {
    // Create a new notification
    createNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const notification = new notificationModel_1.default(data);
                const savedNotification = yield notification.save();
                res.status(201).json(savedNotification);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
            }
        });
    },
    // Retrieve all notifications for a user
    getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const notifications = yield notificationModel_1.default.find({ userId });
                res.status(200).json(notifications);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
            }
        });
    },
    // Update a notification
    updateNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notificationId = req.params.id;
                const updates = req.body;
                const notification = yield notificationModel_1.default.findByIdAndUpdate(notificationId, updates, {
                    new: true,
                });
                if (!notification) {
                    return res.status(404).json({ error: 'Notification not found' });
                }
                res.status(200).json(notification);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
            }
        });
    },
    // Delete a notification
    deleteNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notificationId = req.params.id;
                const notification = yield notificationModel_1.default.findByIdAndDelete(notificationId);
                if (!notification) {
                    return res.status(404).json({ error: 'Notification not found' });
                }
                res.status(204).json({ message: 'Notification deleted' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(400).json({ error: 'An unknown error occurred' });
                }
            }
        });
    },
};
//# sourceMappingURL=notificationController.js.map