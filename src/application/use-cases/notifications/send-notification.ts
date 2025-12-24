import { Injectable } from '@nestjs/common';

import { Notification } from '@/domain/entities/notification/notification.entity';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { Content } from '@/domain/entities/notification/content.entity';

import { SendNotificationDto } from '@/application/dto/send-notification.dto';

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(data: SendNotificationDto): Promise<Notification> {
    const { content, recipientId } = data;

    const notification = new Notification({
      content: new Content(content),
      recipientId,
    });

    const createdNotification =
      await this.notificationRepository.save(notification);

    return createdNotification;
  }
}
