import { Costumer } from '@/domain/entities/costumer/costumer.entity';
import { CostumersRepository } from '@/domain/repositories/costumers.repository';

export class InMemoryCostumersRepository implements CostumersRepository {
  public items: Costumer[] = [];

  async findByEmail(email: string): Promise<Costumer | null> {
    await Promise.resolve();
    const costumer = this.items.find((item) => item.email === email);
    return costumer || null;
  }

  async findById(id: string): Promise<Costumer | null> {
    await Promise.resolve();
    const costumer = this.items.find((item) => item.id === id);
    return costumer || null;
  }

  async create(costumer: Costumer): Promise<Costumer> {
    await Promise.resolve();
    this.items.push(costumer);
    return costumer;
  }

  async save(data: Costumer): Promise<Costumer> {
    await Promise.resolve();
    const costumerIndex = this.items.findIndex((item) => item.id === data.id);
    this.items[costumerIndex] = data;
    return data;
  }
}
