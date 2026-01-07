import type { AuthTokenPayload } from '@/types/api';
import { ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';
import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';
import { FetchNotificationsUseCase } from '@/application/use-cases/notifications/fetch-notifications';
import { FetchCustomerNotificationsUseCase } from '@/application/use-cases/notifications/fetch-customer-notifications';

import { CurrentCustomer } from '@/infra/shared/decorators/current-customer.decorator';
import { Public } from '@/infra/shared/decorators/public.decorator';

import { SendNotificationBody } from '../dto/send-notification-body';
import { ReadNotificationQuery } from '../dto/read-notification-query';
import { NotificationViewModel } from '../view-model/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private fetchNotifications: FetchNotificationsUseCase,
    private fetchCustomerNotifications: FetchCustomerNotificationsUseCase,
  ) {}

  @Get()
  async findAll() {
    const notifications = await this.fetchNotifications.execute();
    return {
      data: NotificationViewModel.toManyHttp(notifications),
    };
  }

  @Get('/me')
  async findCustomerNotifications(
    @CurrentCustomer() customer: AuthTokenPayload,
  ) {
    const customerId = customer.sub;

    const notifications = await this.fetchCustomerNotifications.execute({
      recipientId: customerId,
    });

    return {
      data: NotificationViewModel.toManyHttp(notifications),
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
      notification: NotificationViewModel.toHttp(notification),
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
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
