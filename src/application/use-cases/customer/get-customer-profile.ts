import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomersRepository } from '@/domain/repositories/customers.repository';
import { Customer } from '@/domain/entities/customer/customer.entity';

interface GetCustomerProfileRequest {
  customerId: string;
}

@Injectable()
export class GetCustomerProfileUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({ customerId }: GetCustomerProfileRequest): Promise<Customer> {
    const customer =
      await this.customersRepository.findCustomerProfile(customerId);

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return customer;
  }
}
