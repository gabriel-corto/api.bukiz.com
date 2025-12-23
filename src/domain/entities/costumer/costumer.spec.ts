import { Costumer } from './costumer.entity';

describe('Costumer Entity', () => {
  it('Should be able to create Costumer', () => {
    const costumer = new Costumer({
      email: 'gabrielcorto272@gmail.com',
    });

    expect(costumer.id).toBeDefined();
    expect(costumer.createdAt).toBeInstanceOf(Date);
  });

  it('Should not be able to create costumer with invalid e-mail', () => {
    expect(() => {
      new Costumer({ email: 'gabriel.com' });
    }).toThrow();
  });
});
