import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { NotificationsController } from './controllers/notifications.controller';

import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';

import { VerifyCostumerAuthCodeUseCase } from '@/application/use-cases/auth/verify-costumer-otp';
import { VerifyCostumerEmailUseCase } from '@/application/use-cases/auth/verify-costumer-email';
import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';
import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [AuthController, AppController, NotificationsController],
  providers: [
    VerifyCostumerEmailUseCase,
    SendNotificationUseCase,
    ReadNotificationUseCase,
    VerifyCostumerAuthCodeUseCase,
  ],
})
export class HTTPModule {}
