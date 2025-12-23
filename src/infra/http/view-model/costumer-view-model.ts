import { Costumer } from '@/domain/entities/costumer/costumer.entity';

export class CostumerViewModel {
  static toHttp(costumer: Costumer) {
    return {
      id: costumer.id,
      email: costumer.email,
      createdAt: costumer.createdAt,
      updatedAt: costumer.updatedAt,
    };
  }
}
