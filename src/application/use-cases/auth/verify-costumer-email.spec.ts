import { InMemoryCostumersRepository } from '@test/repositories/in-memory-costumers.repository';
import { FakeMailService } from '@test/gateways/fake-mail.gateway';
import { VerifyCostumerEmailUseCase } from './verify-costumer-email';

describe('Verify Costumer', () => {
  it('Should be able to verify a costumer', async () => {
    const mailGateway = new FakeMailService();
    const costumersRepository = new InMemoryCostumersRepository();
    const validateCostumer = new VerifyCostumerEmailUseCase(
      mailGateway,
      costumersRepository,
    );

    const costumer = await validateCostumer.execute({
      email: 'gabrielcorto272@gmail.com',
    });

    expect(costumer).toBeTruthy();
    expect(costumer.id).toBeDefined();

    expect(costumersRepository.items).toHaveLength(1);
    expect(costumersRepository.items[0].email).toEqual(
      'gabrielcorto272@gmail.com',
    );
  });
});
