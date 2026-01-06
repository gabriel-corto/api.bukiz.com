import { Customer } from './customer.entity';
import { Email } from './value-objects/email';

describe('Customer Entity', () => {
  it('Should be able to create Customer', () => {
    const customer = Customer.create({
      email: Email.create('gabrielcorto272@gmail.com'),
    });

    expect(customer.id).toBeDefined();
    expect(customer.createdAt).toBeInstanceOf(Date);
  });

  it('Should not be able to create customer with invalid e-mail', () => {
    expect(() => {
      Customer.create({ email: Email.create('gabriel.com') });
    }).toThrow();
  });
});
