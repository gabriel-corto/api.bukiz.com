import type { AuthTokenPayload } from '@/types/api';
import { Controller, Get } from '@nestjs/common';

import { CurrentCustomer } from '@/infra/shared/decorators/current-customer.decorator';

import { CustomersRepository } from '@/domain/repositories/customers.repository';
import { CustomerViewModel } from '../view-model/customer-view-model';

@Controller('profile')
export class ProfileController {
  constructor(private customersRepository: CustomersRepository) {}

  @Get('/me')
  async findCustomerNotifications(
    @CurrentCustomer() customer: AuthTokenPayload,
  ) {
    const customerId = customer.sub;
    const profile =
      await this.customersRepository.findCustomerProfile(customerId);

    return {
      data: CustomerViewModel.toHttp(profile),
    };
  }
}
