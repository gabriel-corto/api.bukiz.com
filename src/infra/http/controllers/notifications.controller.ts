import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';
import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationBody } from '../dto/send-notification-body';
import { ReadNotificationQuery } from '../dto/read-notification-query';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
  ) {}

  @Post('')
  async send(@Body() body: SendNotificationBody) {
    const { content, recipientId } = body;

    const notification = await this.sendNotification.execute({
      content,
      recipientId,
    });

    return { notification };
  }

  @Patch(':notificationId')
  async read(@Param() param: ReadNotificationQuery) {
    const { notificationId } = param;

    const notification = await this.readNotification.execute({
      notificationId,
    });

    return { notification };
  }
}
