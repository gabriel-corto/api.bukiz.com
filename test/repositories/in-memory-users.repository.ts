import { User } from '@/domain/entities/user/user.entity';
import { UsersRepository } from '@/domain/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<User> {
    await Promise.resolve();
    this.items.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    await Promise.resolve();
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    await Promise.resolve();
    const user = this.items.find((item) => item.id === id);
    return user || null;
  }
}
