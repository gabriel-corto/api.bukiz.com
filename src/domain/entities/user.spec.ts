import { User } from './user.entity';

describe('User Entity', () => {
  it('Should be able to create user', () => {
    const user = new User({
      email: 'gabrielcorto272@gmail.com',
    });

    expect(user.id).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('Should not be able to create user with invalid e-mail', () => {
    expect(() => {
      new User({ email: 'gabriel.com' });
    }).toThrow();
  });
});
