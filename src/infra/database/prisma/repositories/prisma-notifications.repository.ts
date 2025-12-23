import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Notification } from '@/domain/entities/notification/notification.entity';
import { ReadNotificationDto } from '@/application/dto/read-notification.dto';
import { PrismaNotificationsMapper } from '../mappers/prisma-notifications-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Notification[]> {
    const rawNotifications = await this.prisma.notification.findMany();

    return rawNotifications.map((raw) => {
      return PrismaNotificationsMapper.toDomain(raw);
    });
  }

  async save(data: Notification): Promise<Notification> {
    const prismaNotification = PrismaNotificationsMapper.toPrisma(data);

    const existingNotification = await this.findById({
      notificationId: data.id,
    });

    if (existingNotification) {
      const updated = await this.prisma.notification.update({
        data: prismaNotification,
        where: {
          id: prismaNotification.id,
        },
      });

      return PrismaNotificationsMapper.toDomain(updated);
    }

    const notification = await this.prisma.notification.create({
      data: prismaNotification,
    });

    return PrismaNotificationsMapper.toDomain(notification);
  }

  async findById(data: ReadNotificationDto): Promise<Notification | null> {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: data.notificationId,
      },
    });

    return notification
      ? PrismaNotificationsMapper.toDomain(notification)
      : null;
  }
}
