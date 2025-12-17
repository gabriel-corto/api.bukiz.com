import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { FakeMailService } from '@test/gateways/fake-mail.gateway';
import { VerifyUserUseCase } from './verify-user';

describe('Verify User', () => {
  it('Should be able to verify an user', async () => {
    const mailGateway = new FakeMailService();
    const usersRepository = new InMemoryUsersRepository();
    const validateUser = new VerifyUserUseCase(mailGateway, usersRepository);

    const user = await validateUser.execute({
      email: 'gabrielcorto272@gmail.com',
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeDefined();

    expect(usersRepository.items).toHaveLength(1);
    expect(usersRepository.items[0].email).toEqual('gabrielcorto272@gmail.com');
  });
});
