import mongoose, { Document, Schema } from 'mongoose';

// Extend the default mongoose Document interface to include the required fields
export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Notification model from the schema
const NotificationSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create the Notification model from the schema
const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

// Export the Notification model
export default Notification;
