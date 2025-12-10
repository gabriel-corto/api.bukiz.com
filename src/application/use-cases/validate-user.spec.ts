import { ValidateUserUseCase } from './validate-user';
import { User } from '@/domain/entities/user.entity';

import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { FakeMailService } from '@test/gateways/fake-mail.gateway';

describe('Validate User', () => {
  it('Should be able to validate user', async () => {
    const mailGateway = new FakeMailService();
    const usersRepository = new InMemoryUsersRepository();
    const validateUser = new ValidateUserUseCase(mailGateway, usersRepository);

    const user = new User({
      email: 'gabrielcorto272@gmail.com',
    });

    await validateUser.execute({
      email: user.email,
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeDefined();

    expect(usersRepository.items).toHaveLength(1);
    expect(usersRepository.items[0].email).toEqual('gabrielcorto272@gmail.com');
  });
});
