import { ReadNotificationDto } from '@/application/dto/read-notification.dto';
import { Notification } from '@/domain/entities/notifications/notification.entity';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findAll(): Promise<Notification[]> {
    await Promise.resolve();
    return this.notifications;
  }

  async save(notification: Notification): Promise<Notification> {
    await Promise.resolve();

    const itemIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (itemIndex >= 0) {
      this.notifications[itemIndex] = notification;
    } else {
      this.notifications.push(notification);
    }

    return notification;
  }

  async findById({
    notificationId,
  }: ReadNotificationDto): Promise<Notification | null> {
    await Promise.resolve();
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    return notification || null;
  }
}
