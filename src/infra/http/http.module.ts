import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { NotificationsController } from './controllers/notifications.controller';

import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';

import { VerifyOtpUseCase } from '@/application/use-cases/auth/verify-otp';
import { VerifyUserUseCase } from '@/application/use-cases/auth/verify-user';
import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';
import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [AuthController, AppController, NotificationsController],
  providers: [
    VerifyUserUseCase,
    SendNotificationUseCase,
    ReadNotificationUseCase,
    VerifyOtpUseCase,
  ],
})
export class HTTPModule {}
