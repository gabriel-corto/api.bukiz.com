import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

import { ProfileController } from '../controllers/profile.controller';
import { CustomersController } from '../controllers/customers.controller';

import { GetCustomerProfileUseCase } from '@/application/use-cases/customer/get-customer-profile';
import { FetchCustomersUseCase } from '@/application/use-cases/customer/fetch-costumers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController, CustomersController],
  providers: [GetCustomerProfileUseCase, FetchCustomersUseCase],
  exports: [GetCustomerProfileUseCase, FetchCustomersUseCase],
})
export class CustomerModule {}
