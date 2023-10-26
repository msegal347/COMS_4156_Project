import express from 'express';
import { notificationController } from '../controllers/notificationController';

const router = express.Router();

// Create a new notification
router.post('/', notificationController.createNotification);

// Retrieve all notifications for a user
router.get('/:userId', notificationController.getNotifications);

// Update a notification by its ID
router.put('/:id', notificationController.updateNotification);

// Delete a notification by its ID
router.delete('/:id', notificationController.deleteNotification);

export default router;
