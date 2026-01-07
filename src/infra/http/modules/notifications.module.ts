import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { NotificationsController } from '../controllers/notifications.controller';
import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';
import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';
import { FetchNotificationsUseCase } from '@/application/use-cases/notifications/fetch-notifications';
import { FetchCustomerNotificationsUseCase } from '@/application/use-cases/notifications/fetch-customer-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    ReadNotificationUseCase,
    FetchNotificationsUseCase,
    FetchCustomerNotificationsUseCase,
  ],
  exports: [
    SendNotificationUseCase,
    ReadNotificationUseCase,
    FetchNotificationsUseCase,
    FetchCustomerNotificationsUseCase,
  ],
})
export class NotificationsModule {}
