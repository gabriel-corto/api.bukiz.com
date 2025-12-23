import { User } from '@/domain/entities/user/user.entity';
import { UsersRepository } from '@/domain/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

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

  async create(user: User): Promise<User> {
    await Promise.resolve();
    this.items.push(user);
    return user;
  }

  async save(data: User): Promise<User> {
    await Promise.resolve();
    const userIndex = this.items.findIndex((item) => item.id === data.id);
    this.items[userIndex] = data;
    return data;
  }
}
