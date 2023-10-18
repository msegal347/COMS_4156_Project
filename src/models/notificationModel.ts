import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
