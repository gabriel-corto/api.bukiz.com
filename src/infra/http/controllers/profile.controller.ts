import type { AuthTokenPayload } from '@/types/api';
import { Controller, Get } from '@nestjs/common';

import { CurrentCustomer } from '@/infra/shared/decorators/current-customer.decorator';
import { CustomerViewModel } from '../view-model/customer-view-model';
import { GetCustomerProfileUseCase } from '@/application/use-cases/customer/get-customer-profile';

@Controller('profile')
export class ProfileController {
  constructor(private getCustomerProfile: GetCustomerProfileUseCase) {}

  @Get('/me')
  async findCustomerNotifications(
    @CurrentCustomer() customer: AuthTokenPayload,
  ) {
    const customerId = customer.sub;
    const profile = await this.getCustomerProfile.execute({ customerId });

    return {
      data: CustomerViewModel.toHttp(profile),
    };
  }
}
