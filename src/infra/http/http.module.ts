import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';
import { AuthGuard } from '../shared/guard/auth.guard';

import { AppController } from './controllers/app.controller';

import { AuthModule } from './modules/auth.module';
import { BooksModule } from './modules/books.module';
import { NotificationsModule } from './modules/notifications.module';
import { CustomerModule } from './modules/customer.module';

@Module({
  imports: [
    DatabaseModule,
    MailModule,
    AuthModule,
    BooksModule,
    NotificationsModule,
    CustomerModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HTTPModule {}
