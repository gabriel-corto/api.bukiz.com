import { Notification } from '@/domain/entities/notification/notification.entity';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      createdAt: notification.createdAt,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      hasRead: notification.hasRead,
    };
  }

  static toManyHttp(notifications: Notification[]) {
    return notifications.map((notification) => this.toHttp(notification));
  }
}
