import { Request, Response } from 'express';
import Notification, { INotification } from '../models/notificationModel';

export const notificationController = {
  // Create a new notification
  async createNotification(req: Request, res: Response) {
    try {
      const data: INotification = req.body;
      const notification = new Notification(data);
      const savedNotification = await notification.save();
      res.status(201).json(savedNotification);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  },

  // Retrieve all notifications for a user
  async getNotifications(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const notifications = await Notification.find({ userId });
      res.status(200).json(notifications);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  },

  // Update a notification
  async updateNotification(req: Request, res: Response) {
    try {
      const notificationId = req.params.id;
      const updates = req.body;
      const notification = await Notification.findByIdAndUpdate(notificationId, updates, {
        new: true,
      });
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json(notification);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  },

  // Delete a notification
  async deleteNotification(req: Request, res: Response) {
    try {
      const notificationId = req.params.id;
      const notification = await Notification.findByIdAndDelete(notificationId);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(204).json({ message: 'Notification deleted' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  },
};
