import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';
import { AuthGuard } from '../shared/guard/auth.guard';

import { VerifyCostumerAuthCodeUseCase } from '@/application/use-cases/auth/verify-costumer-otp';
import { VerifyCostumerEmailUseCase } from '@/application/use-cases/auth/verify-costumer-email';
import { SendNotificationUseCase } from '@/application/use-cases/notifications/send-notification';
import { ReadNotificationUseCase } from '@/application/use-cases/notifications/read-notification';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [
    DatabaseModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    AuthController,
    AppController,
    NotificationsController,
    ProfileController,
  ],
  providers: [
    VerifyCostumerEmailUseCase,
    SendNotificationUseCase,
    ReadNotificationUseCase,
    VerifyCostumerAuthCodeUseCase,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HTTPModule {}
