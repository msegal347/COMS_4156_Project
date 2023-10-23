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
exports.notificationService = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
exports.notificationService = {
    // Create a new notification
    createNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = new notificationModel_1.default(data);
            return yield notification.save();
        });
    },
    // Retrieve all notifications for a user
    getNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notificationModel_1.default.find({ userId });
        });
    },
    // Update a notification by its ID
    updateNotification(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notificationModel_1.default.findByIdAndUpdate(id, updates, { new: true });
        });
    },
    // Delete a notification by its ID
    deleteNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notificationModel_1.default.findByIdAndDelete(id);
        });
    },
};
//# sourceMappingURL=notificationService.js.map