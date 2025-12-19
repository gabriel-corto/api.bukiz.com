import { User } from '../entities/user/user.entity';
export abstract class UsersRepository {
  abstract create(data: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
