import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';

import { VerifyUserUseCase } from '@/application/use-cases/auth/verify-user';

import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';

import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';
import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [AuthController, AppController, NotificationsController],
  providers: [
    VerifyUserUseCase,
    SendNotificationUseCase,
    ReadNotificationUseCase,
  ],
})
export class HTTPModule {}
