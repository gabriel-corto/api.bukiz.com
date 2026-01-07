import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MailModule } from '../../mail/mail.module';
import { AuthController } from '../controllers/auth.controller';
import { VerifyCustomerEmailUseCase } from '@/application/use-cases/auth/verify-customer-email';
import { VerifyCustomerAuthCodeUseCase } from '@/application/use-cases/auth/verify-customer-otp';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [AuthController],
  providers: [VerifyCustomerEmailUseCase, VerifyCustomerAuthCodeUseCase],
  exports: [VerifyCustomerEmailUseCase, VerifyCustomerAuthCodeUseCase],
})
export class AuthModule {}
