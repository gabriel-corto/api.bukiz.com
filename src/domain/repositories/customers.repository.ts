import { Customer } from '../entities/customer/customer.entity';
export abstract class CustomersRepository {
  abstract create(data: Customer): Promise<Customer>;
  abstract save(data: Customer): Promise<Customer>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract findById(id: string): Promise<Customer | null>;
  abstract findCustomerProfile(id: string): Promise<Customer>;
}
