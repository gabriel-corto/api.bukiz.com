import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';

import { VerifyUserUseCase } from '@/application/use-cases/verify-user';

import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [AuthController, AppController],
  providers: [VerifyUserUseCase],
})
export class HTTPModule {}
