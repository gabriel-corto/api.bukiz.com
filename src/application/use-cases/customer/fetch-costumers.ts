import { Customer } from '@/domain/entities/customer/customer.entity';
import { CustomersRepository } from '@/domain/repositories/customers.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchCustomersUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(): Promise<Customer[]> {
    return await this.customersRepository.findAll();
  }
}
