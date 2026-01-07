import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { Notification } from '@/domain/entities/notification/notification.entity';

@Injectable()
export class FetchNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(): Promise<Notification[]> {
    return await this.notificationRepository.findAll();
  }
}
