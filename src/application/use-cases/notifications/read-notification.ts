import { ReadNotificationDto } from '@/application/dto/read-notification.dto';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(data: ReadNotificationDto) {
    const { notificationId } = data;

    const notification = await this.notificationRepository.findById({
      notificationId,
    });

    if (!notification) {
      throw new BadRequestException('Notificação não encontrada!');
    }

    notification.read();
    const updatedNotification =
      await this.notificationRepository.save(notification);

    return updatedNotification;
  }
}
