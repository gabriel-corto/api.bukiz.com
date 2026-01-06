import { Customer } from './customer.entity';
import { Email } from './value-objects/email';

describe('Customer Entity', () => {
  it('Should be able to create Customer', () => {
    const customer = new Customer({
      email: Email.create('gabrielcorto272@gmail.com'),
    });

    expect(customer.id).toBeDefined();
    expect(customer.createdAt).toBeInstanceOf(Date);
  });

  it('Should not be able to create customer with invalid e-mail', () => {
    expect(() => {
      new Customer({ email: Email.create('gabriel.com') });
    }).toThrow();
  });
});
