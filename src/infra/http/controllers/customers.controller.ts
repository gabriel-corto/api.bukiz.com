import { Controller, Get } from '@nestjs/common';
import { Public } from '@/infra/shared/decorators/public.decorator';
import { FetchCustomersUseCase } from '@/application/use-cases/customer/fetch-costumers';
import { CustomerViewModel } from '../view-model/customer-view-model';

@Controller('customers')
export class CustomersController {
  constructor(private fetchCustomersUseCase: FetchCustomersUseCase) {}

  @Public()
  @Get()
  async getAllCustomers() {
    const customers = await this.fetchCustomersUseCase.execute();
    return {
      data: CustomerViewModel.toManyHttp(customers),
    };
  }
}
