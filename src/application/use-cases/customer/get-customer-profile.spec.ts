import { InMemoryCustomersRepository } from '@/infra/database/in-memory/in-memory-customers.repository';
import { GetCustomerProfileUseCase } from './get-customer-profile';
import { Customer } from '@/domain/entities/customer/customer.entity';
import { Email } from '@/domain/entities/customer/value-objects/email';
import { NotFoundException } from '@nestjs/common';

describe('Get Customer Profile', () => {
  let customersRepository: InMemoryCustomersRepository;
  let getCustomerProfile: GetCustomerProfileUseCase;

  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository();
    getCustomerProfile = new GetCustomerProfileUseCase(customersRepository);
  });

  it('Should be able to get a customer profile', async () => {
    const customer = Customer.create({
      email: Email.create('john.doe@example.com'),
    });
    await customersRepository.create(customer);

    const result = await getCustomerProfile.execute({
      customerId: customer.id,
    });

    expect(result).toEqual(customer);
  });

  it('Should throw NotFoundException if customer does not exist', async () => {
    await expect(
      getCustomerProfile.execute({ customerId: 'invalid-id' }),
    ).rejects.toThrow(NotFoundException);
  });
});
