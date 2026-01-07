import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { Notification } from '@/domain/entities/notification/notification.entity';

interface FetchCustomerNotificationsRequest {
  recipientId: string;
}

@Injectable()
export class FetchCustomerNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
  }: FetchCustomerNotificationsRequest): Promise<Notification[]> {
    return await this.notificationRepository.findCustomerNotifications(
      recipientId,
    );
  }
}
