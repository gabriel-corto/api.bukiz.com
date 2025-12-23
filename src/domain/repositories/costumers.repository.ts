import { Costumer } from '../entities/costumer/costumer.entity';
export abstract class CostumersRepository {
  abstract create(data: Costumer): Promise<Costumer>;
  abstract save(data: Costumer): Promise<Costumer>;
  abstract findByEmail(email: string): Promise<Costumer | null>;
  abstract findById(id: string): Promise<Costumer | null>;
}
