import { Customer } from '@/domain/entities/customer/customer.entity';

export class CustomerViewModel {
  static toHttp(customer: Customer) {
    return {
      id: customer.id,
      email: customer.email,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
