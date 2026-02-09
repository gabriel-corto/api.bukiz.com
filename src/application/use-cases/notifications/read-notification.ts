import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadNotificationDto } from '@/application/dto/read-notification.dto';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(data: ReadNotificationDto) {
    const { notificationId } = data;

    const notification = await this.notificationRepository.findById({
      notificationId,
    });

    if (!notification) {
      throw new NotFoundException('Notificação não encontrada!');
    }

    notification.read();
    const updatedNotification =
      await this.notificationRepository.save(notification);

    return updatedNotification;
  }
}
