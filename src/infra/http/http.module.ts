import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';

import { ValidateUserUseCase } from '@/application/use-cases/validate-user';

import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [AuthController, AppController],
  providers: [ValidateUserUseCase],
})
export class HTTPModule {}
