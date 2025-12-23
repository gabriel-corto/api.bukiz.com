import { Notification } from '@/domain/entities/notification/notification.entity';

export class NotificationViewModel {
  static toHtpp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      createdAt: notification.createdAt,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      hasRead: notification.hasRead,
    };
  }
}
