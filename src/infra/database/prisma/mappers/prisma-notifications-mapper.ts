import { Content } from '@/domain/entities/notification/content.entity';
import { Notification } from '@/domain/entities/notification/notification.entity';
import { Prisma, Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationsMapper {
  static toPrisma(notification: Notification): Prisma.NotificationCreateInput {
    return {
      id: notification.id,
      content: notification.content,
      createdAt: notification.createdAt ?? new Date(),
      hasRead: notification.hasRead ?? false,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
    };
  }

  static toDomain(raw: PrismaNotification): Notification {
    const notification = new Notification({
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
      id: raw.id,
      hasRead: raw.hasRead,
    });

    return notification;
  }
}
