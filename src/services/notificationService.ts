import Notification, { INotification } from '../models/notificationModel';
import { Types, ObjectId } from 'mongoose';

export const notificationService = {
  // Create a new notification
  async createNotification(data: INotification): Promise<INotification> {
    const notification = new Notification(data);
    return await notification.save();
  },

  // Retrieve all notifications for a user
  async getNotifications(userId: ObjectId): Promise<INotification[]> {
    return await Notification.find({ userId });
  },

  // Update a notification by its ID
  async updateNotification(
    id: ObjectId,
    updates: Partial<INotification>
  ): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(id, updates, { new: true });
  },

  // Delete a notification by its ID
  async deleteNotification(id: ObjectId): Promise<INotification | null> {
    return await Notification.findByIdAndDelete(id);
  },
};
