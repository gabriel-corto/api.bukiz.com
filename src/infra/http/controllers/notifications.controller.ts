import type { AuthTokenPayload } from '@/types/api';
import { ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { NotificationRepository } from '@/domain/repositories/notifications.repository';
import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';
import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';

import { CurrentCustomer } from '@/infra/shared/decorators/current-customer.decorator';

import { SendNotificationBody } from '../dto/send-notification-body';
import { ReadNotificationQuery } from '../dto/read-notification-query';
import { Public } from '@/infra/shared/decorators/public.decorator';
import { NotificationViewModel } from '../view-model/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private notificationRepository: NotificationRepository,
  ) {}

  @Get()
  async findAll() {
    const notifications = await this.notificationRepository.findAll();
    return {
      data: notifications.map((notification) =>
        NotificationViewModel.toHtpp(notification),
      ),
    };
  }

  @Get('/me')
  async findCustomerNotifications(
    @CurrentCustomer() customer: AuthTokenPayload,
  ) {
    const customerId = customer.sub;

    const notifications =
      await this.notificationRepository.findCustomerNotifications(customerId);
    return {
      data: notifications.map((notification) =>
        NotificationViewModel.toHtpp(notification),
      ),
    };
  }

  @Post('')
  @Public()
  async send(@Body() body: SendNotificationBody) {
    const { content, recipientId } = body;

    const notification = await this.sendNotification.execute({
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHtpp(notification),
    };
  }

  @Public()
  @ApiResponse({ status: 200 })
  @Patch(':notificationId')
  async read(@Param() param: ReadNotificationQuery) {
    const { notificationId } = param;

    const notification = await this.readNotification.execute({
      notificationId,
    });

    return {
      notification: NotificationViewModel.toHtpp(notification),
    };
  }
}
