import { InMemoryCustomersRepository } from '@/infra/database/in-memory/in-memory-customers.repository';
import { FakeMailService } from '@test/gateways/fake-mail.gateway';
import { VerifyCustomerEmailUseCase } from './verify-customer-email';

describe('Verify Customer', () => {
  it('Should be able to verify a customer', async () => {
    const mailGateway = new FakeMailService();
    const customersRepository = new InMemoryCustomersRepository();
    const validateCustomer = new VerifyCustomerEmailUseCase(
      mailGateway,
      customersRepository,
    );

    const customer = await validateCustomer.execute({
      email: 'gabrielcorto272@gmail.com',
    });

    expect(customer).toBeTruthy();
    expect(customer.id).toBeDefined();

    expect(customersRepository.items).toHaveLength(1);
    expect(customersRepository.items[0].email.getValue).toEqual(
      'gabrielcorto272@gmail.com',
    );
  });
});
