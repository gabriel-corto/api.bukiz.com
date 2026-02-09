import { Customer } from '@/domain/entities/customer/customer.entity';
import { CustomersRepository } from '@/domain/repositories/customers.repository';

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = [];

  async findByEmail(email: string): Promise<Customer | null> {
    await Promise.resolve();
    const customer = this.items.find((item) => item.email.getValue === email);
    return customer || null;
  }

  async findById(id: string): Promise<Customer | null> {
    await Promise.resolve();
    const customer = this.items.find((item) => item.id === id);
    return customer || null;
  }

  async findCustomerProfile(id: string): Promise<Customer | null> {
    await Promise.resolve();
    const customer = this.items.find((item) => item.id === id);
    return customer || null;
  }

  async findAll(): Promise<Customer[]> {
    await Promise.resolve();
    return this.items;
  }

  async create(customer: Customer): Promise<Customer> {
    await Promise.resolve();
    this.items.push(customer);
    return customer;
  }

  async save(data: Customer): Promise<Customer> {
    await Promise.resolve();
    const customerIndex = this.items.findIndex((item) => item.id === data.id);
    this.items[customerIndex] = data;
    return data;
  }
}
