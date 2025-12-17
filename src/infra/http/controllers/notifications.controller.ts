import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';
import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationBody } from '../dto/send-notification-body';
import { ReadNotificationQuery } from '../dto/read-notification-query';
import { NotificationPresent } from '@/domain/entities/notifications/notification.entity';
import { NotificationRepository } from '@/domain/repositories/notifications.repository';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private notificationRepository: NotificationRepository,
  ) {}

  @Get('')
  async findAll() {
    const notifications = await this.notificationRepository.findAll();
    return {
      data: notifications.map((notification) =>
        NotificationPresent.toHtpp(notification),
      ),
    };
  }

  @Post('')
  async send(@Body() body: SendNotificationBody) {
    const { content, recipientId } = body;

    const notification = await this.sendNotification.execute({
      content,
      recipientId,
    });

    return NotificationPresent.toHtpp(notification);
  }

  @Patch(':notificationId')
  async read(@Param() param: ReadNotificationQuery) {
    const { notificationId } = param;

    const notification = await this.readNotification.execute({
      notificationId,
    });

    return NotificationPresent.toHtpp(notification);
  }
}
