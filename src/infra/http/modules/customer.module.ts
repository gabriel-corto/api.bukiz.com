import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ProfileController } from '../controllers/profile.controller';
import { GetCustomerProfileUseCase } from '@/application/use-cases/customer/get-customer-profile';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [GetCustomerProfileUseCase],
  exports: [GetCustomerProfileUseCase],
})
export class CustomerModule {}
